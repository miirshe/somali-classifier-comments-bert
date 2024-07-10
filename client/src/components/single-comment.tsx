"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

type FormData = {
  comment: string;
};

const labels = [
  "Sun ah",
  "Fuxshi",
  "Goodis",
  "Caay",
  "Sinji-nacayb",
  "Aan sun aheyn",
];

const SingleCommentInput = () => {
  const [prediction, setPrediction] = useState(null);
  const Schema = yup.object({
    comment: yup.string().required("comment is required"),
  });

  const form = useForm<FormData>({
    resolver: yupResolver(Schema),
  });

  const onsubmit: SubmitHandler<FormData> = async (values: any) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Response data:", data);
        setPrediction(data);
      } else {
        console.log("Response error:", response);
      }
    } catch (error) {
      console.log("Submit comment failed:", error);
    }
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Prediction",
        data: prediction ? labels.map((label) => prediction[label]) : [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="my-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="flex flex-col lg:flex-row justify-center gap-2"
        >
          <FormField
            name="comment"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Write your comment..."
                    multiple
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full md:w-fit">Predict</Button>
        </form>
      </Form>

      {prediction && <Bar data={chartData} />}
    </div>
  );
};

export default SingleCommentInput;
