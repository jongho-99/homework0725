package com.kh.homework0724.todo.api;

import com.kh.homework0724.page.PageVo;
import com.kh.homework0724.todo.service.TodoService;
import com.kh.homework0724.todo.vo.StatusVo;
import com.kh.homework0724.todo.vo.TodoVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/todo")
@CrossOrigin(value = "*")
public class TodoApiController {

    private final TodoService todoService;

    @GetMapping("{no}")
    public ResponseEntity<Map<String,Object>> todoList(@PathVariable int no) {

        int pageCnt = todoService.pageCnt();

        PageVo pageVo = new PageVo(pageCnt, no, 5, 5);

        List<TodoVo> voList = todoService.todoList(pageVo);

        Map<String, Object> map = new HashMap<>();

        map.put("voList", voList);
        map.put("pageVo", pageVo);

        if(voList != null) {
            return ResponseEntity.ok().body(map);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        }

    }

    @GetMapping("{statusNo}/{no}")
    public ResponseEntity<Map<String,Object>> todoListByStatus(@PathVariable int no, @PathVariable int statusNo) {

        int pageCnt = todoService.pageCntByStatus(statusNo);

        PageVo pageVo = new PageVo(pageCnt, no, 5, 5);

        List<TodoVo> voList = todoService.todoListByStatus(pageVo, statusNo);

        Map<String, Object> map = new HashMap<>();

        map.put("voList", voList);
        map.put("pageVo", pageVo);

        if(voList != null) {
            return ResponseEntity.ok().body(map);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        }

    }

    @PostMapping
    public ResponseEntity<Integer> todoInsert(@RequestBody TodoVo vo) {

        int result = todoService.todoInsert(vo);

        if(result == 1) {
            return ResponseEntity.ok().body(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }


    @PutMapping
    public ResponseEntity<Integer> updateTodo(@RequestBody TodoVo vo) {

        int result = todoService.updateTodo(vo);

        if(result == 1) {
            return ResponseEntity.ok().body(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }

    @DeleteMapping
    public ResponseEntity<Integer> deleteTodo(@RequestBody TodoVo vo) {

        int result = todoService.deleteTodo(vo);

        if(result == 1) {
            return ResponseEntity.ok().body(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }

    @GetMapping("statusList")
    public ResponseEntity<List<StatusVo>> statusList() {

        List<StatusVo> voList = todoService.statusList();

        if(voList != null) {
            return ResponseEntity.ok().body(voList);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(voList);
        }

    }

}
