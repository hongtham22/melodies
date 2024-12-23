'use client'
import { useRouter } from "next/navigation";
import Comment from "@/components/comment";
import { CommentProvider } from "@/components/provider/commentProvider";
import { Notification } from "@/types/interfaces";

interface ShowDeleteCommentProps {
    onClose: () => void,
    notification?: Notification
}
const ShowDeleteComment: React.FC<ShowDeleteCommentProps> = ({ onClose, notification }) => {
    const router = useRouter()
    const reportContents = ['Toxic', 'Severe Toxic', 'Obscene', 'Threat', 'Insult', 'Identity Hate']
    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    const [checkboxStates, reportText] = (() => {
        const parts = notification?.report.content.split(',');
        const checkboxes = parts?.slice(0, 6).map((value) => value === '1') || [];
        const text = parts?.slice(6).join(',') || '';
        return [checkboxes, text];
    })();

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 shadow-md"
            onClick={handleBackgroundClick}
        >
            <div className="bg-[#222222] w-[35%] rounded-lg p-5 border border-primaryColorBlue/60 flex flex-col">
                <div className="text-primaryColorPink font-bold text-[1.5rem] pb-3">
                    {notification?.message}
                </div>
                <CommentProvider>
                    <Comment role="parent" time={notification?.report.comment.createdAt} comment={notification?.report.comment.content} dataUser={notification?.report.comment.user} showNotification={true} />
                </CommentProvider>
                <p className="font-semibold -mt-2 my-2">
                    Your comment violates the following standards
                </p>
                <div className='grid grid-cols-2 gap-5 gap-x-16 mb-5'>
                    {
                        reportContents.map((content, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    checked={checkboxStates[index]}
                                    type="checkbox"
                                    name="contentCheck"
                                    id={`contentCheck${index}`}
                                />
                                <label htmlFor={`contentCheck${index}`}>{content}</label>
                            </div>
                        ))
                    }
                </div>
                <div className="w-full mb-4">
                    <textarea
                        className="w-full h-[100px] outline-none p-2 rounded-md text-black"
                        name=""
                        id=""
                        placeholder='Nội dung báo cáo...'
                        value={reportText}
                    ></textarea>
                </div>
                <div className="self-end text-[0.85rem] space-x-4">
                    <button
                        className='p-2 font-bold '
                        onClick={() => onClose()}>
                        Close
                    </button>
                    <button
                        className='p-2 bg-primaryColorPink text-black font-bold rounded-2xl'
                        onClick={() => { router.push(`/song/${notification?.report.comment.songId}`); onClose(); }}>
                        Redirect to Song
                    </button>
                </div>
            </div>
        </div >
    )
}

export default ShowDeleteComment