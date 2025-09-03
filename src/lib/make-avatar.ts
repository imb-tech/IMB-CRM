/**
 * "Shoxjahon Xamidov" -> "SX"
 * "Shohjaxon"          -> "Sh"
 * "o‘tkir oqilov"      -> "OO"
 * "g'iyos"             -> "G'"
 * "Jean-Paul Sartre"   -> "JS"
 */
export function makeAvatar(raw?: string): string {
    if (!raw) return "";

    const cleaned = raw
        .replace(/[_.,()*]+/g, " ")
        .replace(/[-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (!cleaned) return "";

    const words = cleaned.split(" ").filter(Boolean);

    const apos = "[\\u0027\\u02BC\\u2018\\u2019\\u0060]";

    if (words.length === 1) {
        const w = words[0];

        const m =
            w.match(new RegExp(`^(sh|ch|ng)`, "i")) ||
            w.match(new RegExp(`^(o${apos})`, "i")) ||
            w.match(new RegExp(`^(g${apos})`, "i"));

        if (m) {
            const grp = m[1];
            if (grp.length === 2 && /[ocg]/i.test(grp[0]) && grp[1].match(new RegExp(apos))) {
                return grp[0].toUpperCase() + grp[1]; // "O’", "G’"
            }
            return grp[0].toUpperCase() + grp.slice(1).toLowerCase();
        }

        return w[0].toUpperCase();
    }

    return words
        .map(w => w[0]?.toUpperCase() || "")
        .join("");
}
