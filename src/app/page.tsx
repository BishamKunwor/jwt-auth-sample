"use client";

import { Button, Form, Input, message } from "antd";
import { useCallback } from "react";
import { axiosPrivate } from "./axios";

export default function Home() {
  const fetchData = useCallback(async () => {
    try {
      const response = await axiosPrivate("/api/data");
      message.success("Data Fetched Successfully");
    } catch (error) {
      message.error("Error While Fetching Data");
    }
  }, []);

  return (
    <section>
      <main className="h-screen flex items-center justify-center gap-12">
        <Button onClick={fetchData}>Fetch Data</Button>
      </main>
    </section>
  );
}
