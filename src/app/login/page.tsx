"use client";
import { Button, Form, Input, message } from "antd";
import { axiosPrivate } from "../axios";
import { useAuth } from "../auth/AuthStore";

export default function Login() {
  const { setToken } = useAuth();

  return (
    <section>
      <main className="h-screen flex items-center justify-center gap-12">
        <Form
          className="max-w-96 border rounded-lg p-8 bg-slate-50"
          onFinish={async (formData) => {
            try {
              const response = await axiosPrivate({
                method: "POST",
                url: "/api/login",
                data: formData,
              });
              message.success(response.data.message);
              setToken(response.data.accessToken);
            } catch (error) {
              message.error(error.response.data.error);
            }
          }}
        >
          <h2 className="mb-4 text-xl font-bold">Login</h2>
          <Form.Item name="email">
            <Input />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password />
          </Form.Item>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </Form>
      </main>
    </section>
  );
}
