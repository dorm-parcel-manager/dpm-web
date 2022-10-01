#!/usr/bin/env zx

import "zx/globals";
import path from "path";
import fs from "fs/promises";
import { Octokit } from "@octokit/rest";

const protoDir = path.join(__dirname, "..", "proto");

const octokit = new Octokit();
const { data: files } = await octokit.repos.getContent({
  owner: "dorm-parcel-manager",
  repo: "dpm",
  path: "proto",
});
await fs.rm(protoDir, { recursive: true, force: true });
await fs.mkdir(protoDir, { recursive: true });
for (const file of files) {
  const contents = await fetch(file.download_url).then((res) => res.text());
  await fs.writeFile(path.join(protoDir, file.name), contents);
}
