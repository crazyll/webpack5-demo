export function getUserInfo() {
  return {
    code: 200,
    data: {
      name: 'haha',
      gender: '女',
    }
  }
}

export function addUser(params) {
  console.log(params);

  return {
    code: 200,
    data: {
      name: 'haha',
      gender: '女',
    }
  }
}