
 
 let currentPage = 1;
 function todoList(currentPage) {
    
    const url = `/api/todo/${currentPage}`

    fetch(url)
    .then(resp => resp.json())
    .then(map => {

        const voList = map.voList;
        const pvo = map.pageVo;

        const tb = document.querySelector("#tb");

        tb.innerHTML = '';
        let str = '';
        for(let vo of voList) {

            str += `
                <tr>
                    <th scope="row">${vo.no}</th>
                    <td>${vo.title}</td>
                    <td>${vo.content}</td>
                    <td>${vo.statusName}</td>
                    <td>${vo.createdDate}</td>
                    <td>
                    <button type="button" class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onclick="openEditModal('${vo.no}', '${vo.title}', '${vo.content}', '${vo.statusName}')">
                    수정하기
                    </button>
                    </td>
                    <td>
                    <button type="button" class="btn btn-danger" onclick="todoDelete(${vo.no})">삭제하기</button>
                    </td>
                </tr>
            `
        }

        tb.innerHTML = str;

        const pageAreaDiv = document.querySelector('#page-area');
        let pageStr = '';
        if (pvo.startpPage != 1)
            pageStr += `<button class="btn btn-outline-primary" onclick="todoList(${pvo.startPage - 1})">이전</button>`;

        for (let i = pvo.startPage; i <= pvo.endPage; ++i) {
            if (i == currentPage) {
            pageStr += `<button class="btn btn-outline-primary" class="active" onclick="todoList(${i})">${i}</button>`;
            } else {
            pageStr += `<button class="btn btn-outline-primary" onclick="todoList(${i})">${i}</button>`;
            }
        }

        if (pvo.endPage != pvo.maxPage)
            pageStr += `<button class="btn btn-outline-primary" onclick="todoList(${pvo.endPage + 1})">다음</button>`;

        pageAreaDiv.innerHTML = pageStr;

    })
 }

 todoList(currentPage);

let editNo = null;  // 전역으로 수정 대상 번호 저장
let currentStatusName = null; //전역으로 수정 대상 상태 번호 저장

function openEditModal(no, title, content, statusName) {
    editNo = no;  
    document.querySelector("#updateTitle").value = title;
    document.querySelector("#updateContent").value = content;
    
    currentStatusName = statusName;

    statusList();

}
 


 function todoInsert() {
    const url = "/api/todo"

    const title = document.querySelector("#insertTitle").value;
    const content = document.querySelector("#insertContent").value;

    const vo = {
        title,
        content
    }

    const option = {
        method : "POST",
        headers : {'CONTENT-TYPE' : 'application/json'},
        body : JSON.stringify(vo)
    }

    fetch(url, option)
    .then(resp => resp.json())
    .then(result => {

        if(result == 1) {
            Swal.fire({
    title: "등록성공이에여 !!!!!!!!!!",
    text: "",
    icon: "success"   
    });
            todoList(1);

            const modalEl = document.querySelector("#registerModal");
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();   // 정식 API로 닫기

        } else {
            Swal.fire({
  icon: "error",
  title: "등록실패에요 ㅠㅠ",
  text: "제대로 작동 안댔다고 !!!!!!!!!!!!!!",
  footer: '<a href="#">Why do I have this issue?</a>'
});
        }

    })
 }

let no;

 function todoUpdate() {
    const url = "/api/todo";

    const title = document.querySelector("#updateTitle").value;
    const content = document.querySelector("#updateContent").value;
    const statusNo = document.querySelector("#status").value;

    const vo = {
        no: editNo,
        title,
        content,
        statusNo
    };

    const option = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vo)
    };

    fetch(url, option)
        .then(resp => resp.json())
        .then(result => {
            if (result == 1) {
                Swal.fire({
    title: "수정성공이에여!!!!!!",
    text: "",
    icon: "success"   
    });
                todoList(1);
                const modalEl = document.querySelector("#editModal");
                const modal = bootstrap.Modal.getInstance(modalEl);
                modal.hide();   // 정식 API로 닫기

            } else {
                Swal.fire({
                icon: "error",
                title: "수정실패에요ㅠㅠㅠㅠ",
                text: "제대로 작동 안댔다고 !!!!!!!!!!!!!!",
                footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
        });
}

 function todoDelete(no) {
    const url = "/api/todo"

    const vo = {
        no
    }

    const option = {
        method : "DELETE",
        headers : {'CONTENT-TYPE' : 'application/json'},
        body : JSON.stringify(vo)
    }

    fetch(url, option)
    .then(resp => resp.json())
    .then(result => {

        if(result == 1) {
            Swal.fire({
    title: "삭제되었습니다",
    text: "",
    icon: "success"   
    });
            todoList(1);
        } else {
            Swal.fire({
  icon: "error",
  title: "삭제실패에요ㅠㅠㅠㅠ",
  text: "제대로 작동 안댔다고 !!!!!!!!!!!!!!",
  footer: '<a href="#">Why do I have this issue?</a>'
});
        }
        
    })
 }


function statusList() {
    const url = "/api/todo/statusList"

    fetch(url)
    .then(resp => resp.json())
    .then(voList => {

        const selectStatus = document.querySelector("#status");

        selectStatus.innerHTML = '';
        let str = '';
        for(let vo of voList) {
        
            if(currentStatusName == vo.statusName) {
                
            str += `
                <option selected value="${vo.statusNo}">${vo.statusName}</option>
            `} else {
            str += `
                <option value="${vo.statusNo}">${vo.statusName}</option>
            `
            }
        }

        selectStatus.innerHTML = str;
    })
}



