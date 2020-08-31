#!/bin/sh

export KUBE_TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)

# check if VAULT_ADDR declared
if [ -z "$VAULT_ADDR" ]; then
    echo "VAULT_ADDR not set, exiting .. "
    exit 1
else
    echo "Found VAULT_ADDR: $VAULT_ADDR "
fi

export VAULT_TOKEN=$(vault write -field=wrapping_token -wrap-ttl=60s auth/kubernetes/login role=example jwt=$KUBE_TOKEN)

envconsul \
        -vault-addr $VAULT_ADDR \
        -vault-token $VAULT_TOKEN\
        -config ./vault-config.hcl\
        -once $ENTRY_COMMAND
