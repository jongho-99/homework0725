function list() {
  url = 'http://127.0.0.1:8080/api/board';
  fetch(url)
    .then((resp) => resp.json())
    .then((voList) => {
      const listTbody = document.querySelector('.list tbody');
      let str = '';
      for (const vo of voList) {
        str += `
          <tr>
            <td>${vo.no}</td>
            <td>${vo.title}</td>
            <td>${vo.content}</td>
            <td>${vo.createdAt}</td>
            <td>${vo.modifiedAt}</td>
          </tr>
        `;
      }
      listTbody.innerHTML = str;
    });
}
list();

function insert() {
  const title = document.querySelector('input[name=insertTitle]').value;
  const content = document.querySelector('textarea[name=insertContent]').value;
  const vo = {
    title,
    content,
  };
  url = 'http://127.0.0.1:8080/api/board';
  option = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vo),
  };
  fetch(url, option)
    .then((resp) => resp.json())
    .then((result) => {
      if (result == 1) {
        alert('등록성공');
        list();
      } else {
        alert('등록실패');
        console.error(err);
      }
    });
}

function selectOne() {
  const no = document.querySelector('input[name=search]').value;
  const url = `http://127.0.0.1:8080/api/board/${no}`;
  fetch(url)
    .then((resp) => resp.json())
    .then((vo) => {
      const searchTbody = document.querySelector('.search tbody');
      let str = '';
      str += `
          <tr>
            <td>${vo.no}</td>
            <td>${vo.title}</td>
            <td>${vo.content}</td>
            <td>${vo.createdAt}</td>
            <td>${vo.modifiedAt}</td>
          </tr>
        `;
      searchTbody.innerHTML = str;
    });
}
selectOne();

function update() {
  const url = `http://127.0.0.1:8080/api/board`;
  const title = document.querySelector('input[name=updateTitle]');
  const content = document.querySelector('textarea[name=updateContent]');
  const vo = {
    title,
    content,
  };
  const option = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vo),
  };
  fetch(url, option)
    .then((resp) => resp.json())
    .then((result) => {
      if (result == 1) {
        alert('수정성공');
        list();
      } else {
        alert('수정실패');
        console.error('err');
      }
    });
}

function deleteBoard() {}
