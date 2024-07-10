from flask import Flask, request, jsonify
from flask_cors import CORS
from facebook_scraper import get_posts
import torch
from transformers import BertTokenizer, BertForSequenceClassification

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

model_path = './toxicity_classifier_bert_model'
model = BertForSequenceClassification.from_pretrained(model_path)
tokenizer = BertTokenizer.from_pretrained(model_path)
model.eval()

def scrape_facebook_comments(url):
    comments = []
    for post in get_posts(post_urls=[url], options={"comments": True}):
        comments.extend(post['comments_full'])
    comment_texts = [comment['comment_text'] for comment in comments]
    return comment_texts

label_columns = ['Sun ah', 'Fuxshi', 'Goodis', 'Caay', 'Sinji-nacayb', 'Aan sun aheyn']

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
    # Convert numpy float32 to Python float
    pred_percentages = [float(p) for p in pred_percentages]
    return {label_columns[i]: pred_percentages[i] for i in range(len(label_columns))}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    comment = data.get('comment', '')
    prediction = predict_single_comment(comment)
    return jsonify(prediction)

@app.route('/predict_multiple', methods=['POST'])
def predict_multiple():
    data = request.json
    url = data.get('url', '')

    # Fetch comments from the URL using the facebook_scraper library
    comments = scrape_facebook_comments(url)

    predictions = [predict_single_comment(comment) for comment in comments]
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)
