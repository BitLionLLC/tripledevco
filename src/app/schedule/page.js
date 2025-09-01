'use client';

import { InlineWidget } from "react-calendly";
import Header from "@/components/Header";

export default function SchedulePage() {
    return (
        <div className="App">
          <Header />
          <InlineWidget url="https://calendly.com/tripledev" />
        </div>
      );
}