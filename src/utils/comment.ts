import { Comment } from '@/interfaces/common';

function toDeletedComment(comment: Comment): Comment {
  return {
    ...comment,
    isDeleted: true,
    content: '삭제된 댓글입니다'
  }
}

export class CommentUtils {
  static refineWhenDelete(comments: Comment[], deleteTargetSeq: number): Comment[] {
    const refinedComments: Comment[] = [];
    comments.forEach((comment: Comment) => {
      if (comment.commentSeq === deleteTargetSeq) {
        // 자식 코멘트가 있으면 삭제된 댓글로 보여주고, 없으면 보여주지 않는다.
        if (comment.childCommentCnt > 0) {
          refinedComments.push(toDeletedComment(comment))
        }
      } else {
        refinedComments.push(comment);
      }
    })
    return refinedComments;
  }
}
