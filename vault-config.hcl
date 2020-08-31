upcase = true

log_level = "info"

secret {
  path = "secret/kubernetes/merge-freeze"
  no_prefix = true
  format = "{{ key }}"
}

# This denotes the start of the configuration section for Vault. All values
# contained in this section pertain to Vault.
vault {

  # This is the grace period between lease renewal and secret re-acquisition.
  # When renewing a secret, if the remaining lease is less than or equal to the
  # configured grace, Envconsul will request a new credential. This
  # prevents Vault from revoking the credential at expiration and Envconsul
  # having a stale credential.
  #
  # Note: If you set this to a value that is higher than your default TTL or
  # max TTL, Envconsul will always read a new secret!
  grace = "15s"

  # This tells Envconsul that the provided token is actually a wrapped
  # token that should be unwrapped using Vault's cubbyhole response wrapping
  # before being used. Please see Vault's cubbyhole response wrapping
  # documentation for more information.
  unwrap_token = true

  # This option tells Envconsul to automatically renew the Vault token given.
  # If you are unfamiliar with Vault's architecture, Vault requires tokens be
  # renewed at some regular interval or they will be revoked. Envconsul will
  # automatically renew the token at half the lease duration of the token. The
  # default value is true, but this option can be disabled if you want to renew
  # the Vault token using an out-of-band process.
  #
  # Note that secrets specified as a prefix are always renewed, even if this
  # option is set to false. This option only applies to the top-level Vault
  # token itself.
  renew_token = false

  # This controls the retry behavior when an error is returned from Consul.
  # Envconsul is highly fault tolerant, meaning it does not exit in the face
  # of failure. Instead, it uses exponential back-off and retry functions
  # to wait for the cluster to become available, as is customary in distributed
  # systems.
  retry {
    # This enabled retries. Retries are enabled by default, so this is
    # redundant.
    enabled = true

    # This specifies the number of attempts to make before giving up. Each
    # attempt adds the exponential backoff sleep time. Setting this to
    # zero will implement an unlimited number of retries.
    attempts = 12

    # This is the base amount of time to sleep between retry attempts. Each
    # retry sleeps for an exponent of 2 longer than this base. For 5 retries,
    # the sleep times would be: 250ms, 500ms, 1s, 2s, then 4s.
    backoff = "250ms"

    # This is the maximum amount of time to sleep between retry attempts.
    # When max_backoff is set to zero, there is no upper limit to the
    # exponential sleep between retry attempts.
    # If max_backoff is set to 10s and backoff is set to 1s, sleep times
    # would be: 1s, 2s, 4s, 8s, 10s, 10s, ...
    max_backoff = "8s"
  }
}
