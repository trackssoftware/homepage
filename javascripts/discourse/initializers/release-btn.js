import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "release-btn",

  initialize() {
    withPluginApi("0.8", (api) => {
      api.onPageChange(() => {
        const btn = document.getElementById("release-btn");
        if (!btn) return;

        fetch("/c/release-notes/7.json") // replace 7 with actual category id
          .then((r) => r.json())
          .then((data) => {
            const topics = data.topic_list?.topics;
            if (topics?.length > 0) {
              const latest = topics[0];
              btn.href = `/t/${latest.slug}/${latest.id}`;
            }
          })
          .catch(() => {});
      });
    });
  },
};
