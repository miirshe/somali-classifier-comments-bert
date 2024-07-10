import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
type FormData = {
  url: string;
};
export default function UrlInput() {
  const [predictions, setPredictions] = useState(null);
  const Schema = yup.object({
    url: yup.string().url().required("comment is required"),
  });
  const form = useForm<FormData>({
    resolver: yupResolver(Schema),
  });
  const onsubmit = async (values: any) => {
    const response = await fetch("/api/fetch-comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Response data:", data);
      setPredictions(data);
    } else {
      console.log("Response error:", response);
    }
  };

  const chartData = {
    labels: [
      "Sun ah",
      "Fuxshi",
      "Goodis",
      "Caay",
      "Sinji-nacayb",
      "Aan sun aheyn",
    ],
    datasets: predictions
      ? predictions.map((prediction, index) => ({
          label: `Comment ${index + 1}`,
          data: Object.values(prediction),
          backgroundColor: `rgba(${Math.random() * 255}, ${
            Math.random() * 255
          }, ${Math.random() * 255}, 0.6)`,
          borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
            Math.random() * 255
          }, 1)`,
          borderWidth: 1,
        }))
      : [],
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="flex flex-col lg:flex-row justify-center gap-2"
        >
          <FormField
            name="url"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input {...field} placeholder="Enter the URL..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full md:w-fit">Fetch and Predict</Button>
        </form>
      </Form>
      {predictions && <Bar data={chartData} />}
    </>
  );
}
