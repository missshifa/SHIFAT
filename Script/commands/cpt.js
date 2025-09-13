// Required libraries for making web requests and handling files
const request = require('request');
const fs = require('fs-extra');
const axios = require('axios');

// Configuration object for the bot command
module.exports.config = {
    name: "Islamick post", // Command name
    version: "1.0.0",
    hasPermssion: 0, // 0 = all users can use
    credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️", // Original author
    description: "Sends random Islamic posts with images",
    commandCategory: "Islamick post rendom",
    usages: "/", // How to use the command
    cooldowns: 11, // Cooldown in seconds
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

// The main function that runs when the command is called
module.exports.run = async function({ api, event }) {

    // Array of Islamic messages and quotes in Bengali
    const messages = [
        "🕋🕋🕋🕋\nআল্লাহর (আলআলা) উপর ভরসা করলে, তিনি কাউকে নিরাশ করেন না।🤲💭 🕋***",
        "╔━━━━━━✦✦🖤✦🖤✦✦━━━━━━╗\nআপনার প্রতিটি দুঃখে আল্লাহ্‌র সাহায্য প্রার্থনা করুন, আর প্রতিটি সুখে আল্লাহ্‌কে স্মরণকরুন।\n╚━━━━━━✦✦🖤✦🖤✦✦━━━━━━╝\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "╔━━━━𝐀𝐥𝐡𝐚𝐦𝐝𝐮𝐥𝐢𝐥𝐥𝐚𝐡﷽\nআমরা সেই তো প্রকৃত মুসলমান যেখান থেকে শিকারীর অন্তর কাঁপে।\n╚━━━━𝐀𝐥𝐡𝐚𝐦𝐝𝐮𝐥𝐢𝐥𝐥𝐚━━━❝ !!ღ᭄࿐\nনবী বলেন, মুসলিম নয়।(তিরমিজি)\n🪔︵︵︵💛💙💚\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "“একমাত্র আল্লাহকে ভয় করো, তাহলে আর কাউকে ভয় পেতে হবে না।\n🙂🌸🦋🌻\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "🕌🕌🕌🕌🕌\nআমরা শ্রেষ্ঠ নবীর শ্রেষ্ঠ উম্মত আমরা।\nআমাদের কোনো পরাজয় নাই।🤲💭 🕋\n*** 🖤🥀\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "︵❝།།🌞🌹💝ლ❛✿\nএকজন মুসলিম যদি গাছ লাগায় বা চাষ করে – আর তা থেকে পশু ও পাখি যা খায়, তাহলে সে একটি সদকা করল – \n(বুখারি ও মুসলিম)\n🔱━━✥❖✥━━🔱\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "•••﷽°°•~—•••\nকুরআনই হল সেরা নির্দেশক। যা রাতের তারা এবং দিনের আলো।\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "❥︎𝐈𝐧 𝐬𝐡𝐚 𝐀𝐥𝐥𝐚𝐡❥︎⌓ \n“একমাত্র আল্লাহ্‌র উপর ভরসা করুন।\nতিনিই সকল বিষয়ের পরিকল্পনাকারী।\n─༅༎༅💙🌼🩷\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "〇ლ__♥❤💙💙\nহযরত মুহাম্মদ (সা) বলেন, “কোনো কিছুই ইবাদতের মতো তোষামোদকারী নয়।\n(তিরমিজি)\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "♡༎𝐀𝐥𝐡𝐚𝐦𝐝𝐮𝐥𝐢𝐥𝐥𝐚𝐡”🌸\nসাধারণ জীবনে, কোনো মুসলিম বান্দা আল্লাহর সন্তুষ্টি লাভের আশায় পরকালের সুখ থেকে বঞ্চিত হবে না।\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "✧A मुसलमान, जो अल्लाह पर विश्वास करता है, हमेशा सुरक्षित रहता है।\n❤️🌼🍀🌸🌺\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "💟💠─༅༎•🌿🦋🍁\nযে ব্যক্তি কোনো মুসলিমের দুঃখ দূর করে, আল্লাহ (আলআলা) তার আখেরাতেরএকট দুঃখ দূর করে দেবেন।\n(বুখারি ও মুসলিম)\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "💖∙──༅༎﷽༎༅─∙ 💖\nমধ্য রাতের নামাজ, কিয়ামতের দিনে আপনার কলবের আলো প্রতিফলিত করে।\n─༅༎•🔸💠🔸༅༎•─\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "•.¸¸.•♥´¨` ♥ ´¨`♥•.¸¸.•\nইসলাম আমাদের দেখায় কিভাবে মানুষের সেবা করতে হয়।\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "✿•𝐁𝐞𝐬𝐭 𝐋𝐢𝐧𝐞-\n“ᵉ😻🌻🔐\nইসলামী নীতি মেনে চললে, জীবন সুন্দর ও সুখময়ী হবেই হবে।\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "🕋🕋🕋🕋\nআল্লাহ্ সুবহানাহু তাআলা আমাদের সবাইকে ইসলামের পথে চলার তৌফিক দান করুন। আমীন।🤲💭 🕋",
        "❥•𝐈𝐬𝐥𝐚𝐦 𝐢𝐬 𝐀𝐛𝐨𝐮𝐭 𝐋𝐢𝐧𝐞❥•\nইসলাম ভ্রতৃত্বের ধর্ম এবং ইসলামের আলোয় আলোকিত হোক সকল মানুষের জীবন।\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "😌💔. ✿🐼⛈️🖇️𝗧𝗵𝗶𝘀 𝗶𝘀 𝗔𝗯𝗼𝘂𝘁 𝗟𝗶𝗻𝗲-\n“আল্লাহর কাছে কিছুই অসম্ভব নয়।\nতিনি চাইলে সবকিছুই সম্ভব।\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───",
        "°°°﷽𝐀𝐥𝐡𝐚𝐦𝐝𝐮𝐥𝐢𝐥𝐥𝐚𝐡”🌼\n\nআল্লাহ্ সুবহানাহু তাআলা আমাদের সবাইকে ইসলামের পথে চলার তৌফিক দান করুন। আমীন।🤲💭 🕋\n*** 🖤🥀\n\n──꯭─⃝‌‌𝗦𝗜𝗙𝗨 𝗕𝗢𝗧───"
    ];

    // Array of image URLs from Imgur
    const images = [
        "https://i.imgur.com/JOZrf.jpeg", "https://i.imgur.com/eQEgQ.jpeg", "https://i.imgur.com/sDBco.jpeg",
        "https://i.imgur.com/GNwHZ.jpeg", "https://i.imgur.com/QoPjk.jpeg", "https://i.imgur.com/qWeRq.jpeg",
        "https://i.imgur.com/VHtxb.jpeg", "https://i.imgur.com/WKnjt.jpeg", "https://i.imgur.com/ZFBys.jpeg",
        "https://i.imgur.com/ZhTVN.jpeg", "https://i.imgur.com/GWIkf.jpeg", "https://i.imgur.com/JDcwC.jpeg",
        "https://i.imgur.com/XZjIL.jpeg", "https://i.imgur.com/RdVRO.jpeg", "https://i.imgur.com/ESHNJxr.jpeg",
        "https://i.imgur.com/gc17ZIL.jpeg", "https://i.imgur.com/MrnFFTs.jpeg", "https://i.imgur.com/rl5DsnE.jpeg",
        "https://i.imgur.com/Tj6adbm.jpeg", "https://i.imgur.com/vkLlOgs.jpeg", "https://i.imgur.com/s7lWVBQ.jpeg",
        "https://i.imgur.com/X41jmrh.jpeg", "https://i.imgur.com/L5ZEaPA.jpeg", "https://i.imgur.com/QQjV0Ec.jpeg",
        "https://i.imgur.com/RzlDJy9.jpeg", "https://i.imgur.com/6yjeFrc.jpeg", "https://i.imgur.com/JmwQicn.jpeg",
        "https://i.imgur.com/QDnkQZh.jpeg", "https://i.imgur.com/uXi1lrg.jpeg", "https://i.imgur.com/xfaDpuj.jpeg",
        "https://i.imgur.com/YyNjYOU.jpeg", "https://i.imgur.com/rbYjAZ2.jpeg", "https://i.imgur.com/Sbw1Ek5.jpeg",
        "https://i.imgur.com/h0CMDtn.jpeg", "https://i.imgur.com/5idifU6.jpeg", "https://i.imgur.com/9MyDAos.jpeg",
        "https://i.imgur.com/DQ391x5.jpeg", "https://i.imgur.com/FLGuvcu.jpeg", "https://i.imgur.com/Z4674C4.jpeg",
        "https://i.imgur.com/1d4PKgo.jpeg", "https://i.imgur.com/XfYz6wN.jpeg", "https://i.imgur.com/2NK5XTr.jpeg",
        "https://i.imgur.com/66CoeG7.jpeg", "https://i.imgur.com/GTHrf.jpeg", "https://i.imgur.com/VXIQc.jpeg",
        "https://i.imgur.com/RwXAz.jpeg", "https://i.imgur.com/DduIB.jpeg", "https://i.imgur.com/pKpLE.jpeg",
        "https://i.imgur.com/DxdwS.jpeg", "https://i.imgur.com/cwycO.jpeg", "https://i.imgur.com/iHQek.jpeg",
        "https://i.imgur.com/GWbyf.jpeg", "https://i.imgur.com/sFPtA.jpeg"
    ];

    // Pick a random message from the 'messages' array
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Pick a random image URL from the 'images' array
    const randomImageURL = images[Math.floor(Math.random() * images.length)];

    // Path to save the downloaded image temporarily
    const imagePath = __dirname + '/cache/islam.jpg';

    // Download the image using its URL
    axios.get(randomImageURL, { responseType: 'stream' })
        .then(response => {
            // Create a write stream to save the file
            const writer = fs.createWriteStream(imagePath);
            response.data.pipe(writer);

            // When the file is finished downloading and saved
            writer.on('finish', () => {
                // Send the message with the image as an attachment
                api.sendMessage({
                    body: randomMessage,
                    attachment: fs.createReadStream(imagePath)
                }, event.threadID, () => {
                    // After sending, delete the temporary image file
                    fs.unlinkSync(imagePath);
                });
            });
        })
        .catch(error => {
            console.error('Error downloading image:', error);
            // If image download fails, just send the text message
            api.sendMessage(randomMessage, event.threadID);
        });
};
  
