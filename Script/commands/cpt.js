const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
    name: ",",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "𝗦𝗛𝗜𝗙𝗔𝗧",
    description: "Send random welcome message with random image",
    commandCategory: "system",
    usages: "intro",
    cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
    const { threadID, messageID } = event;

    // 📝 Random welcome messages
    const messages = [
        "🌸 আসসালামু আলাইকুম!\n\nআমি বট আছি আপনাদের সাহায্যের জন্য 😊\n\n👉 help লিখে সব কমান্ড দেখুন।\n👉 info লিখে আমার সম্পর্কে জানুন।\n👉 prefix ck লিখে prefix পরিবর্তন করুন।",
        "✨ হ্যালো! আমি আপনার গ্রুপ বট 🌼\n\nhelp = সব কমান্ড\ninfo = বট সম্পর্কিত তথ্য\nprefix ck = prefix জানার জন্য।\n\nEnjoy 😍",
        "💠 Assalamu alaikum 💠\n\nআমি আপনার বট, সবসময় প্রস্তুত 🚀\n\n👉 help ➤ সব কমান্ড\n👉 info ➤ বট সম্পর্কে\n👉 prefix ck ➤ prefix জানুন।"
    ];

    const msg = messages[Math.floor(Math.random() * messages.length)];

    // 🖼️ Random image list
    const images = [
        "https://i.imgur.com/UMtQhVe.jpg",
        "https://i.imgur.com/t8F1dKs.jpg",
        "https://i.imgur.com/4ZQZ8Mn.jpg",
        "https://i.imgur.com/LfM9k1u.jpg",
        "https://i.imgur.com/Y8fF0jF.jpg"
    ];

    const imgURL = images[Math.floor(Math.random() * images.length)];
    const imgPath = __dirname + "/cache/intro.jpg";

    try {
        // ⬇️ Download random image
        const response = await axios.get(imgURL, { responseType: "arraybuffer" });
        fs.writeFileSync(imgPath, Buffer.from(response.data, "utf-8"));

        // 📩 Send message with image
        api.sendMessage(
            {
                body: msg,
                attachment: fs.createReadStream(imgPath)
            },
            threadID,
            () => fs.unlinkSync(imgPath), // ✅ delete image after send
            messageID
        );
    } catch (err) {
        console.error("❌ Image download failed:", err);
        api.sendMessage(msg, threadID, messageID);
    }
};
