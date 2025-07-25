package com.kh.homework0724.todo.service;

import com.kh.homework0724.page.PageVo;
import com.kh.homework0724.todo.mapper.TodoMapper;
import com.kh.homework0724.todo.vo.StatusVo;
import com.kh.homework0724.todo.vo.TodoVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TodoService {

    private final TodoMapper todoMapper;

    public List<TodoVo> todoList(PageVo pageVo) {
        return todoMapper.todoList(pageVo);
    }

    public int todoInsert(TodoVo vo) {
        return todoMapper.todoInsert(vo);
    }

    public TodoVo todoSelectOne(String no) {
        return todoMapper.todoSelectOne(no);
    }

    public int updateTodo(TodoVo vo) {
        return todoMapper.updateTodo(vo);
    }

    public int deleteTodo(TodoVo vo) {
        return todoMapper.deleteTodo(vo);
    }

    public List<StatusVo> statusList() {
        return todoMapper.statusList();
    }

    public int pageCnt() {
        return todoMapper.pageCnt();
    }
}
