// This port owns its application mappings. Inputs come only from the pinned local palette.


const bare = (hex) => hex.slice(1);

function fishTheme(f) {
  const vars = [
    ["fish_color_normal", f.r("fg")], ["fish_color_command", f.r("function")], ["fish_color_keyword", f.r("keyword")],
    ["fish_color_quote", f.r("string")], ["fish_color_redirection", f.r("operator")], ["fish_color_end", f.r("punctuation")],
    ["fish_color_error", f.r("error")], ["fish_color_param", f.r("parameter")], ["fish_color_option", f.r("type")],
    ["fish_color_comment", f.r("comment")], ["fish_color_selection", `${f.r("fg")} --background=${bare(f.r("selection"))}`],
    ["fish_color_operator", f.r("accent")], ["fish_color_escape", f.r("escape")], ["fish_color_autosuggestion", f.r("fgSubtle")],
    ["fish_color_cwd", f.r("type")], ["fish_color_cwd_root", f.r("error")], ["fish_color_user", f.r("success")],
    ["fish_color_host", f.r("info")], ["fish_color_host_remote", f.r("warning")], ["fish_color_status", f.r("error")],
    ["fish_color_valid_path", `${f.r("fg")} --underline`], ["fish_color_history_current", `${f.r("fg")} --bold`],
    ["fish_color_search_match", `${f.r("fg")} --background=${bare(f.c("surface1"))}`], ["fish_color_cancel", f.r("fgSubtle")],
    ["fish_pager_color_progress", f.r("fgSubtle")], ["fish_pager_color_background", ""],
    ["fish_pager_color_prefix", `${f.r("accent")} --bold --underline`], ["fish_pager_color_completion", f.r("fg")],
    ["fish_pager_color_description", f.r("fgMuted")], ["fish_pager_color_selected_background", `--background=${bare(f.r("selection"))}`],
    ["fish_pager_color_selected_prefix", `${f.r("accent")} --bold --underline`], ["fish_pager_color_selected_completion", f.r("fg")],
    ["fish_pager_color_selected_description", f.r("fgAlt")], ["fish_pager_color_secondary_background", ""],
    ["fish_pager_color_secondary_prefix", f.r("accent")], ["fish_pager_color_secondary_completion", f.r("fgAlt")],
    ["fish_pager_color_secondary_description", f.r("fgMuted")],
  ];
  const line = ([k, v]) => `${k} ${v.replace(/#/g, "")}`.trimEnd();
  return `# name: '${f.name}'
# preferred_background: ${bare(f.r("bg"))}
# url: https://github.com/living-code-theme/fish

${vars.map(line).join("\n")}
`;
}

const fish = {
files: (f) => [{ path: `${f.slug}.theme`, content: fishTheme(f) }]
};

export function generate(flavors) {
  return [...flavors.flatMap(f => fish.files(f)), ...(fish.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
