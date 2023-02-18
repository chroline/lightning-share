import { lazy, Suspense } from "preact/compat";
import { StateUpdater, useState } from "preact/hooks";

import constate from "constate";
import React from "react";

type View = {
  slug: null | "upload" | "download" | "file" | "server" | "auth";
  params?: Record<string, any>;
};

export const [ViewControllerProvider, useViewController] = constate(() => {
  const [view, setView] = useState<View>({ slug: null, params: {} });
  return [view, setView] as [View, StateUpdater<View>];
});

const UploadView = lazy(() => import("./views/upload"));
const DownloadView = lazy(() => import("./views/download"));
const FileView = lazy(() => import("./views/file"));
const ServerView = lazy(() => import("./views/server"));
const AuthView = lazy(() => import("./views/auth"));

export const ViewController = () => {
  const [view, setView] = useViewController();

  const onClose = () => setView(view => ({ ...view, slug: null }));

  return (
    /* @ts-ignore */
    <Suspense fallback={<></>}>
      <UploadView isOpen={view.slug === "upload"} onClose={onClose} />
      <DownloadView isOpen={view.slug === "download"} onClose={onClose} />
      <FileView isOpen={view.slug === "file"} onClose={onClose} />
      <ServerView isOpen={view.slug === "server"} onClose={onClose} />
      <AuthView isOpen={view.slug === "auth"} onClose={onClose} />
    </Suspense>
  );
};
