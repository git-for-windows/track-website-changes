# A repository tracking some websites' updates

In Git for Windows, we bundle a few components with the installer. To stay on top of those updates, we have a [GitHub workflow](https://github.com/git-for-windows/git/blob/HEAD/.github/workflows/monitor-components.yml) that opens a new ticket whenever a new version of one of those components was released.

This serves us really well for those projects that announce new versions via RSS/Atom feeds, explicitly or implicitly (publishing a tag on GitHub does this implicitly).

However, for the `less` and `PCRE2` components, this is not possible. `PCRE2` does not even announce new versions via any feed, and `less` announces on its home page whether a published release is meant for public consumption or for beta testing.

Hence this repository.

It's heart is a GitHub workflow that monitors the websites, and when they change, figures out via pattern matching what the newest release is, opening a new ticket if there isn't one about that release yet.

To make sure that the website is not downloaded (and parsed) over and over again, a copy of the contents is committed and pushed (hence the need for a _separate_ repository). That allows us to only download the contents if they have changed, by sending a `HEAD` request and comparing the `Last-Modified` header.
