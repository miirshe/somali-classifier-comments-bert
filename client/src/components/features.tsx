"use client"
import React from "react";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
const Features = () => {
  const features = [
    {
      id: "1",
      heading: "Toxicity Detection",
      subHeading: "Detect and classify toxic comments.",
      icon: "mdi:comments-outline",
    },
    {
      id: "2",
      heading: "Sentiment Analysis",
      subHeading: "Analyze the sentiment of comments.",
      icon: "streamline:money-graph-analytics-business-product-graph-data-chart-analysis",
    },
    {
      id: "3",
      heading: "Real-Time Processing",
      subHeading: "Process comments in real-time",
      icon: "fluent-mdl2:processing",
    },
    {
      id: "4",
      heading: "Comprehensive Reports",
      subHeading: "Generate detailed reports of comment analysis.",
      icon: "material-symbols:report-outline",
    },
  ];
  return (
    <Container className="mt-0 space-y-4">
      <Typography className="text-center leading-10 tracking-widest" variant="h4">Features</Typography>
      <Grid container spacing={4}>
        {features.map((item, i) => (
          <Grid item xs={12} md={5} lg={3} key={i} className="ml-5 md:ml-auto">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <Icon icon={item.icon} width={50} height={50} />
              <Stack spacing={0.5}>
                <Typography variant="body1" className="text-center md:text-start">{item.heading}</Typography>
                <Typography variant="body2" className="text-center md:text-start">{item.subHeading}</Typography>
              </Stack>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
