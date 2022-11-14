import { useIsFetching } from "@tanstack/react-query";
import React from "react";

export default function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();

  return isFetching ? <div>Fetching in the background...</div> : null;
}
