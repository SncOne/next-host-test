"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const firebaseConfig = {
    apiKey: "AIzaSyCk_lvvum1PUtmSU3CRxgrp3yexfVlQ5iI",
    authDomain: "next-host-test.firebaseapp.com",
    projectId: "next-host-test",
    storageBucket: "next-host-test.appspot.com",
    messagingSenderId: "586141810520",
    appId: "1:586141810520:web:ce2aca61db43630afe6f2d",
    measurementId: "G-84M0XCFBJ8",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  useEffect(() => {
    const setupAnalytics = async () => {
      if (typeof window !== "undefined" && (await isSupported())) {
        const analytics = getAnalytics(app);
      }
    };
    setupAnalytics();
  }, []);
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
