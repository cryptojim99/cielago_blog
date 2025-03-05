+++
title = "pod with a writable /tmp volume"
date = "2025-03-05"
template = "page.html"
description = ""

[taxonomies]
tags = [ "containers", "pods", "mounts", "kubernetes", "filesystem" ]
+++ 

## Setup

Basically you need 

Example YAML
Here’s an example of a pod with a writable /tmp volume using emptyDir:

```yaml

apiVersion: v1
kind: Pod
metadata:
  name: writable-tmp-pod
spec:
  containers:
  - name: my-container
    image: busybox
    command: ["sleep", "3600"]
    volumeMounts:
    - name: temp-volume
      mountPath: /tmp
      readOnly: false  # Ensure this is false or omitted
  volumes:
  - name: temp-volume
    emptyDir: {}
```

## Debugging Steps

Describe the Pod: Use kubectl describe pod <pod-name> to check for errors or warnings related to volume mounting.

Check Logs: Look at the container logs for any errors related to filesystem access.

Exec into the Pod: Use kubectl exec -it <pod-name> -- /bin/sh to inspect the /tmp directory and its permissions.

If the issue persists, provide more details about your pod specification and cluster configuration for further assistance.

## References

- [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/) - official K8s docs
- [configure-volume-storage](https://kubernetes.io/docs/tasks/configure-pod-container/configure-volume-storage/)
- [5-types-of-kubernetes-volumes](https://bluexp.netapp.com/blog/cvo-blg-5-types-of-kubernetes-volumes-and-how-to-work-with-them#h_h4)