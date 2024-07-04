"use client";

import {
  type PropsWithChildren,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { axiosPrivate, axiosPublic } from "../axios";
import { AuthContextProvider } from "./AuthStore";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string>();

  useLayoutEffect(() => {
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axiosPrivate.interceptors.request.eject(reqInterceptor);
  }, [accessToken]);

  useLayoutEffect(() => {
    const resInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status !== 403) {
          return Promise.reject(error);
        }

        try {
          const response = await axiosPublic({ url: "/api/refresh-token" });

          setAccessToken(response.data.accessToken);
          const prevConfig = error.config;

          prevConfig.headers.Authorization = `Bearer ${response.data.accessToken}`;

          return axiosPrivate(prevConfig);
        } catch (e) {
          setAccessToken(undefined);
          return Promise.reject(error);
        }
      }
    );

    () => axiosPrivate.interceptors.response.eject(resInterceptor);
  }, [accessToken]);

  const values = useMemo(() => {
    return { accessToken, setToken: (token: string) => setAccessToken(token) };
  }, [accessToken]);

  return <AuthContextProvider value={values}>{children}</AuthContextProvider>;
}
