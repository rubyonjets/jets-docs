code.copy.strategy | auto | Jets chooses a copy strategy. The preference is `git_rsync`. Options: `auto full git_copy git_inline git_rsync`
code.copy.always_keep | ["config/jets/env"] | Files to always copy to the archive zip regardless of `.gitignore`
code.copy.always_remove | "tmp" | Files to always delete regardless of `.gitignore`