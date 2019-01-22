export default {
  // 获取电影接口,
  filmsUrl: 'http://129.204.109.25:3000/api/getFilms',
  // 获取所有城市接口,
  citysUrl: 'http://129.204.109.25:3000/api/getcitys',
  // 获取城市ID接口, 参数:cityName 代表城市名称
  cityIdUrl: 'http://129.204.109.25:3000/api/getcityId',
  // 获取影院接口, 参数:cityId 代表城市Id
  cinemasUrl: 'http://129.204.109.25:3000/api/getCinemas',
  // 获取某部影片详细信息, 参数:filmId 代表电影Id
  filmItemUrl: 'http://129.204.109.25:3000/api/getfilmItem',
  // 获取9.9拼团的信息
  teamBuyUrl: 'http://129.204.109.25:3000/api/getTeamBuy',
  // 用户注册, 参数:userName和 userPsw
  userRegisterUrl: 'http://129.204.109.25:3000/user/register',
  // 用户登录, 参数:userName和 userPsw
  userLoginrUrl: 'http://129.204.109.25:3000/user/login',
};
