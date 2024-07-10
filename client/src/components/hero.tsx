"use client";
import {
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import SingleCommentInput from "./single-comment";
import UrlInput from "./url-input";

type CommentType = "SingleCommentInput" | "UrlInput";

const commentTypes = [
  {
    id: "1",
    value: "SingleCommentInput",
    label: "Single Comment",
  },
  {
    id: "2",
    value: "UrlInput",
    label: "Post URL",
  },
];

const Hero: React.FC = () => {
  const [type, setType] = useState<CommentType>("SingleCommentInput");

  const handleChange = (e: any) => {
    console.log("e : ", e.target.value);
    setType(e.target.value as CommentType);
  };

  return (
    <Container>
      <div className="h-screen flex flex-row justify-center items-center gap-4">
        <Stack spacing={4}>
          <Typography variant="h4" className="text-center">
            Somali Comment Classification
          </Typography>
          <Typography
            variant="subtitle1"
            className="leading-10 tracking-widest text-center"
          >
            Easily classify and analyze comments on social media based on the
            Somali language.
          </Typography>

          <FormControl>
            {/* <FormLabel>Choose </FormLabel> */}
            <RadioGroup
              defaultValue="singleComment"
              name="radio-buttons-group"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {commentTypes.map((item) => (
                <FormControlLabel
                  className="flex items-center space-x-2"
                  control={<Radio />}
                  key={item.id}
                  label={item.label}
                  value={item.value}
                  onChange={handleChange}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <RadioGroup
            defaultValue="singleComment"
            onChange={handleChange}
            className="flex flex-row justify-center items-center gap-3"
          ></RadioGroup>

          {type === "SingleCommentInput" && <SingleCommentInput />}

          {type === "UrlInput" && <UrlInput />}
        </Stack>
      </div>
    </Container>
  );
};

export default Hero;
