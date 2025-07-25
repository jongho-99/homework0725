package com.kh.homework0724.todo.mapper;

import com.kh.homework0724.page.PageVo;
import com.kh.homework0724.todo.vo.StatusVo;
import com.kh.homework0724.todo.vo.TodoVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface TodoMapper {

    @Select("""
            SELECT
            T.NO,
            T.TITLE,
            T.CONTENT,
            S.STATUS_NAME,
            T.CREATED_DATE
            FROM TODO T
            JOIN STATUS S ON T.STATUS_NO = S.STATUS_NO
            WHERE T.DEL_YN = 'N'
            ORDER BY T.NO DESC
            OFFSET #{offset} ROWS FETCH NEXT #{boardLimit} ROW ONLY
            """)
    public List<TodoVo> todoList(PageVo pageVo);

    @Select("""
            SELECT
            T.NO,
            T.TITLE,
            T.CONTENT,
            S.STATUS_NAME,
            T.CREATED_DATE
            FROM TODO T
            JOIN STATUS S ON T.STATUS_NO = S.STATUS_NO
            WHERE T.DEL_YN = 'N' AND T.STATUS_NO = #{statusNo}
            ORDER BY T.NO DESC
            OFFSET #{pageVo.offset} ROWS FETCH NEXT #{pageVo.boardLimit} ROW ONLY
            """)
    public List<TodoVo> todoListByStatus(PageVo pageVo, int statusNo);

    @Insert("""
            INSERT INTO TODO(
            NO,
            TITLE,
            CONTENT
            )
            VALUES
            (
            SEQ_TODO.NEXTVAL,
            #{title},
            #{content}
            )
            """)
    public int todoInsert(TodoVo vo);


    @Select("""
            SELECT
            T.NO,
            T.TITLE,
            T.CONTENT,
            S.STATUS_NAME,
            T.CREATED_DATE
            FROM TODO T
            JOIN STATUS S ON T.STATUS_NO = S.STATUS_NO
            WHERE T.DEL_YN = 'N' AND T.NO
            """)
    public TodoVo todoSelectOne(String no);

    @Update("""
            UPDATE TODO SET TITLE = #{title}, CONTENT = #{content}, STATUS_NO = #{statusNo}, UPDATED_DATE = SYSDATE
            WHERE
            NO = #{no}
            """)
    int updateTodo(TodoVo vo);

    @Update("""
            UPDATE TODO SET DEL_YN = 'Y' WHERE NO = #{no}
            """)
    int deleteTodo(TodoVo vo);

    @Select("""
            SELECT * FROM STATUS
            """)
    List<StatusVo> statusList();

    @Select("""
            SELECT COUNT(*) FROM TODO WHERE DEL_YN = 'N'
            """)
    int pageCnt();

    @Select("""
            SELECT COUNT(*) FROM TODO WHERE DEL_YN = 'N' AND STATUS_NO = #{statusNo}
            """)
    int pageCntByStatus(int statusNo);
}
