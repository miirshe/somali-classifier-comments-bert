from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import BertTokenizer, BertForSequenceClassification
import logging
import requests
import facebook

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

model_path = './toxicity_classifier_bert_model'
model = BertForSequenceClassification.from_pretrained(model_path)
tokenizer = BertTokenizer.from_pretrained(model_path)
model.eval()

label_columns = ['Sun ah', 'Fuxshi', 'Goodis', 'Caay', 'Sinji-nacayb', 'Aan sun aheyn']

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fetch_comments_from_facebook(post_id, access_token):
    try:
        graph = facebook.GraphAPI(access_token=access_token)
        comments = graph.get_object(id=post_id, fields="comments")
        comment_texts = [comment['message'] for comment in comments['comments']['data']]
        logger.info(f"Fetched {len(comment_texts)} comments from post {post_id}")
        return comment_texts
    except Exception as e:
        logger.error(f"Failed to fetch comments: {e}")
        return []

def fetch_posts_from_facebook(page_id, access_token):
    try:
        url = f"https://graph.facebook.com/v20.0/{page_id}/feed"
        params = {'access_token': access_token}
        response = requests.get(url, params=params)
        response.raise_for_status()
        posts = response.json()
        logger.info(f"Fetched {len(posts.get('data', []))} posts from page {page_id}")
        return posts
    except Exception as e:
        logger.error(f"Failed to fetch posts: {e}")
        return {}

def predict_single_comment(comment):
    encoding = tokenizer.encode_plus(
        comment,
        add_special_tokens=True,
        max_length=128,
        return_token_type_ids=False,
        padding='max_length',
        truncation=True,
        return_attention_mask=True,
        return_tensors='pt',
    )

    with torch.no_grad():
        input_ids = encoding['input_ids']
        attention_mask = encoding['attention_mask']
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        logits = outputs.logits
        preds = torch.sigmoid(logits).cpu().numpy()

    pred_percentages = preds[0] * 100
    return {label_columns[i]: float(pred_percentages[i]) for i in range(len(label_columns))}

@app.route('/fetch_posts', methods=['POST'])
def fetch_posts():
    data = request.get_json()
    page_id = data.get('page_id')
    access_token = data.get('access_token')

    if not page_id or not access_token:
        return jsonify({"error": "Page ID and access token are required"}), 400

    posts = fetch_posts_from_facebook(page_id, access_token)
    if not posts:
        return jsonify({"error": "Failed to fetch posts or no posts available"}), 404

    return jsonify(posts)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    comment = data.get('comment', '')
    if not comment:
        return jsonify({"error": "Comment is required"}), 400
    prediction = predict_single_comment(comment)
    return jsonify(prediction)

@app.route('/predict_multiple', methods=['POST'])
def predict_multiple():
    data = request.get_json()
    post_id = data.get('post_id', '')
    access_token = data.get('access_token', '')
    if not post_id or not access_token:
        return jsonify({"error": "Post ID and access token are required"}), 400

    comments = fetch_comments_from_facebook(post_id, access_token)
    if not comments:
        return jsonify({"error": "No comments found or unable to fetch comments"}), 404

    predictions = [predict_single_comment(comment) for comment in comments]
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)
