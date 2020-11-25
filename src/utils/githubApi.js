import {
    RESULTS_PER_PAGE,
    GITHUB_REPO_SEARCH_ENDPOINT,
} from "utils/constants";

export default async function findUsersRepos(username, page = 1) {
    const queryParams = `q=user:${username}&sort=stars&page=${page}&per_page=${RESULTS_PER_PAGE}`
    const fetch_response = await fetch(
        `${GITHUB_REPO_SEARCH_ENDPOINT}?${queryParams}`,
        {
            method: "GET"
        }
    )

    if (fetch_response.ok) {
        return await fetch_response.json()
    } else {
        return {
            errorCode: fetch_response.status
        }
    }
}
