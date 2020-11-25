import { useEffect, useState } from "react";
import "./styles.css";

import findUsersRepos from "utils/githubApi"
import DebounceInput from "utils/debounce";
import { RESULTS_PER_PAGE } from "utils/constants";


export default function GithubSearchApp() {
    const [username, setUsername] = useState("");
    const [page, setPage] = useState(1)
    const [repos, setRepos] = useState([]);
    const [repoCount, setRepoCount] = useState(0)
    const [retry, setRetry] = useState(false)

    const debouncedUsername = DebounceInput(username)

    useEffect(() => {
        setPage(1)
    }, [debouncedUsername])

    useEffect(() => {
        if (page < 1) {
            setPage(1);
        }
    }, [page])

    useEffect(() => {
        if (debouncedUsername) {
        // TODO: a loading state with a spinner or something would be nice,
        // especially if we're auto retrying on rate limit and waiting a long time
            getRepos();
        } else {
            setRepos([]);
            setRepoCount(0);
        }
    }, [debouncedUsername, page])

    async function getRepos() {
        const results = await findUsersRepos(debouncedUsername, page)
        if (results.errorCode === 403) {
            setRetry(true)
        } else {
            setRetry(false)
        }

        setRepos(results.items || []);
        setRepoCount(results.total_count || 0)
    }

    return (
        <div className="searchPage">
            <input
                type="text"
                onChange={event => setUsername(event.target.value)}
                placeholder={"Enter Github Username"}
                className="searchInput"
            />
            <div className="searchResults">
                <button
                    onClick={() => setPage(page-1)}
                    disabled={page===1 || retry}
                    className="pageButton"
                >
                    {"<"}
                </button>
                {
                    // TODO: Handle rate limiting a little better,
                    // maybe an auto retry based on the expected refesh time
                    // (Although it seems to me that GitHub incorrectly reports
                    // that in their headers; they pad it by a minute or two)
                    retry ?
                    <div className="rateLimitError">
                        <p>You've been making a lot of fast requests, and got rate limited</p>
                        <button onClick={getRepos}>TRY AGAIN</button>
                    </div>
                    :
                    <div className="resultsList">
                        {
                            repoCount ?
                            <div className="pager">Page {page} of {Math.ceil(repoCount/RESULTS_PER_PAGE)}</div>
                            :
                            null
                        }
                        <div className="repos">
                        {
                            repos.map(repo => (
                                <div className="repo" key={repo.name}>
                                    <a href={repo.html_url}>{repo.name}</a>
                                    <div><span>&#9734;</span>{repo.stargazers_count}</div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                }
                <button
                    onClick={() => setPage(page+1)}
                    disabled={page>=Math.ceil(repoCount/RESULTS_PER_PAGE) || retry}
                    className="pageButton"
                >
                    {">"}
                </button>
            </div>
        </div>
    )
}
