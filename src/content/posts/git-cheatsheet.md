---
title: "Git 常用命令速查"
description: "自己常用的 Git 命令合集，避免每次都搜一遍。"
pubDate: 2025-09-04
tags: ["Git", "工具"]
---

## 日常

```bash
# 修改上一次 commit 的信息
git commit --amend -m "new message"

# 撤销最近一次 commit，但保留改动
git reset --soft HEAD~1

# 撤销最近一次 commit，丢弃改动（慎用）
git reset --hard HEAD~1
```

## 分支

```bash
# 拉取并切换到一个不存在的分支
git switch -c feat/awesome

# 删除本地分支
git branch -d feat/awesome        # 安全删除
git branch -D feat/awesome        # 强制删除

# 重命名当前分支
git branch -m new-name
```

## 远程

```bash
# 改写远程 URL（HTTPS → SSH）
git remote set-url origin git@github.com:USER/REPO.git

# 删除远程分支
git push origin --delete feat/awesome
```

## 救援

```bash
# 查看操作记录，找回丢失的 commit
git reflog

# 把 detached HEAD 上的提交恢复成新分支
git switch -c recovered
```
