const Chat = require("../models/chat");

/// 🔥 SEND MESSAGE
exports.sendMessage = async (req, res) => {

  try {

    const {
      trainerId,
      studentId,
      sender,
      text,
    } = req.body;

    if (
      !trainerId ||
      !studentId ||
      !sender ||
      !text
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    const senderId =
      sender === "trainer"
        ? trainerId
        : studentId;

    const senderName =
      sender === "trainer"
        ? "Trainer"
        : "Student";

    const newMessage = await Chat.create({

      trainerId,

      studentId,

      sender,

      senderId,

      senderName,

      text,

      isRead: sender === "trainer",
    });

    return res.status(200).json({
      success: true,
      data: newMessage,
    });

  } catch (e) {

    console.log("SEND MESSAGE ERROR =>", e);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


/// 🔥 GET TRAINER CHATS
exports.getTrainerChats = async (req, res) => {

  try {

    const { trainerId } = req.params;

    const chats = await Chat.find({
      trainerId,
    }).sort({ createdAt: 1 });

    const grouped = {};

    for (const msg of chats) {

      const key = msg.studentId.toString();

      if (!grouped[key]) {

        grouped[key] = {

          studentId: msg.studentId,

          studentName:
            msg.sender === "student"
              ? msg.senderName
              : "Student",

          relatedClass: null,

          unreadCount: 0,

          messages: [],
        };
      }

      grouped[key].messages.push(msg);

      if (
        msg.sender === "student" &&
        !msg.isRead
      ) {
        grouped[key].unreadCount++;
      }
    }

    return res.status(200).json({
      success: true,
      data: Object.values(grouped),
    });

  } catch (e) {

    console.log(
      "GET TRAINER CHATS ERROR =>",
      e
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getStudentChats = async (
  req,
  res
) => {

  try {

    const { studentId } =
      req.params;

    const chats = await Chat.find({
      studentId,
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages: chats,
    });

  } catch (e) {

    console.log(
      "GET STUDENT CHATS ERROR =>",
      e
    );

    return res.status(500).json({
      success: false,
    });
  }
};