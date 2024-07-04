"use client";

import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios("/api/data");
      message.success("Data Fetched Successfully");
    } catch (error) {
      message.error("Error While Fetching Data");
    }
  }, []);

  useLayoutEffect(() => {
    const reqInterseptor = axios.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && token) {
          config.headers.Authorization = `Bearer ${token ?? null}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    () => axios.interceptors.request.eject(reqInterseptor);
  }, [token]);

  useLayoutEffect(() => {
    const resInterseptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 403) {
          try {
            const originalReqConfig = error.config;

            const response = await axios({ url: "/api/refresh-token" });
            setToken(response.data.accessToken);
            originalReqConfig.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return axios(originalReqConfig);
          } catch (e) {
            setToken(undefined);
            console.log("Route To Login Page");
          }
        }
        return Promise.reject(error);
      }
    );

    () => axios.interceptors.response.eject(resInterseptor);
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section>
      <main className="h-screen flex items-center justify-center gap-12">
        <Form
          className="max-w-96 border rounded-lg p-8 bg-slate-50"
          onFinish={async (formData) => {
            try {
              const response = await axios({
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
        <Form
          className="max-w-96 border rounded-lg p-8 bg-slate-50"
          onFinish={async (formData) => {
            try {
              const response = await axios({
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
        <Button onClick={fetchData}>Fetch Data</Button>
      </main>
    </section>
  );
}
