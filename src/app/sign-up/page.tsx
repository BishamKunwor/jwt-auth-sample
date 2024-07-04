"use client";

import { Button, Form, Input, message } from "antd";
import { axiosPrivate } from "../axios";

export default function SignUp() {
  return (
    <section>
      <main className="h-screen flex items-center justify-center gap-12">
        <Form
          className="max-w-96 border rounded-lg p-8 bg-slate-50"
          onFinish={async (formData) => {
            try {
              const response = await axiosPrivate({
                method: "POST",
                url: "/api/sign-up",
                data: formData,
              });
              message.success(response.data.message);
            } catch (error) {
              message.error(error.response.data.error);
            }
          }}
        >
          <h2 className="mb-4 text-xl font-bold">Register Account</h2>
          <Form.Item name="email">
            <Input />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password />
          </Form.Item>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </div>
        </Form>
      </main>
    </section>
  );
}
