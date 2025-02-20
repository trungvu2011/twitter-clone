import { set } from "mongoose";
import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ to: userId })
            .populate({
                "path": "from",
                "select": "username profileImg"
            });

        await Notification.updateMany({ to: userId }, { $set: { read: true } });

        return res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotifications controller: ", error.message);
        return res.status(500).json({ message: error.message });
    }
}

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({ to: userId });

        return res.status(200).json({ message: "Notifications deleted successfully" });
    } catch (error) {
        console.log("Error in deleteNotifications controller: ", error.message);
        return res.status(500).json({ message: error.message });
    }
}
