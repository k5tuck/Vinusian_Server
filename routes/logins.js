const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const state = process.env.GITHUB_STATE;
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const redirect_uri = "http://localhost:5003/login/github/callback";
const linkedin_state = process.env.LINKEDIN_STATE;
const linkedin_client_id = process.env.LINKEDIN_CLIENT_ID;
const linkedin_client_secret = process.env.LINKEDIN_CLIENT_SECRET;
const linkedin_redirect_uri = "http://localhost:5003/login/linkedin/callback";

async function getGithubAccessToken(code) {
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
      state,
    }),
  });
  const data = await res.text();
  const params = new URLSearchParams(data);
  return params.get("access_token");
}

async function getGithubUser(access_token) {
  const req = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  const data = await req.json();
  return data;
}

async function getLinkedinAccessToken(code) {
  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${linkedin_redirect_uri}&client_id=${linkedin_client_id}&client_secret=${linkedin_client_secret}`,
  });
  const data = await res.json();
  const params = new URLSearchParams(data);
  return params.get("access_token");
}

async function getLinkedinUser(access_token) {
  const req = await fetch("https://api.linkedin.com/v2/me", {
    headers: {
      Connection: "Keep-Alive",
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await req.json();
  return data;
}

router
  .get("/login/github", (req, res) => {
    const githuburl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;
    res.redirect(githuburl);
  })
  .get("/login/github/callback", async (req, res) => {
    const code = req.query.code;
    const token = await getGithubAccessToken(code);
    const githubData = await getGithubUser(token);
    res.json({ githubData });
    // console.log(githubData.login);
  })
  .get("/login/linkedin/", (req, res) => {
    const linkedinurl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&&client_id=${linkedin_client_id}&redirect_uri=${linkedin_redirect_uri}&state=${linkedin_state}&&scope=r_liteprofile%20r_emailaddress`;
    res.redirect(linkedinurl);
  })
  .get("/login/linkedin/callback", async (req, res) => {
    const code = req.query.code;
    // const { state } = req.params;
    // if (state == linkedin_state) {
    try {
      const token = await getLinkedinAccessToken(code);
      const linkedinData = await getLinkedinUser(token);
      res.json({ linkedinData });
    } catch (e) {
      console.log(e);
    }
    // } else {
    //   res.redirect(401, "/");
    // }
  });
// .get("/", (req, res) => {
//   res.send(`
//     <a href="/login/github">
//       <button>Login with Github</button>
//     </a>
//     <br>
//     <a href="/login/linkedin">
//       <button>Login with LinkedIn</button>
//     </a>`);
// });

module.exports = router;
