# Full recovery archive and encryption

GitHub is public. The new release therefore includes a sanitized source/media handover tar and an encrypted full recovery tar, not plaintext original configuration or the users table. The encrypted archive uses `age` with a generated X25519 recovery identity. The identity file is stored only in the designated restricted Second Brain Drive backup folder and must also be placed in the owner's private password manager or recovery vault. Anyone with that key can read the full private archive; never put the identity in GitHub, R2, chat or the public handover tar.

Download the checksums and verify the exact release filenames before extraction. Obtain the private recovery identity from the restricted Drive folder. On macOS the operator can install the open-source tool with `brew install age`; on Ubuntu use `sudo apt install age`.

```bash
sha256sum -c willow-tree-funerals-migration-20261106.sha256
# On macOS if sha256sum is unavailable:
# shasum -a 256 -c willow-tree-funerals-migration-20261106.sha256
age --decrypt -i /secure/path/willow-tree-funerals-recovery-20261106.key.txt \
  -o /secure/path/willow-tree-funerals-full-20261106.tar.gz \
  willow-tree-funerals-full-20261106.tar.gz.age
mkdir -p /secure/path/recovery
chmod 700 /secure/path/recovery
tar -xzf /secure/path/willow-tree-funerals-full-20261106.tar.gz -C /secure/path/recovery
```

The checksum list includes the plaintext full tar hash too. Check it after decryption; it will not be available for the initial checksum step if only encrypted/public release files were downloaded. To check the release-only set first, filter out the plaintext full tar line, then verify the full tar separately after decryption. The preparation run decrypts the archive and checks the resulting SHA-256 before publication; the delivery record contains the actual result.

The full archive retains original source, fresh database SQL/JSON, all recovered and historical media, original Git history, private project configuration, preservation reports and the portable migration source. Do not execute its original Manus configuration or restore its old account-owned keys into the new runtime. Restore current export rows using the guarded operator scripts in the reviewed portable branch. Historical September database files, if present, are for comparison and audit only.

The sanitized public tar includes current public blog rows, portable source/docs/scripts, and recovered public media plus map/exception documentation. It excludes raw `users`, original `.project-config.json`, original private query logs and Git history. Earlier public repository history and September release remain unchanged and are not made private by this new encryption. Review that historical exposure separately; deleting or rewriting history requires owner approval.

Encryption and recovery use the established open-source [age project](https://github.com/FiloSottile/age). Media transfers use [rclone](https://rclone.org/), and the source scan uses [Gitleaks](https://github.com/gitleaks/gitleaks). Their checks do not prove external service account recovery; provider accounts, DNS ownership, actual API permissions and running deployments still require independently verified owner access.
