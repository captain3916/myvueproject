export default {
  // 获取电影接口,
  filmsUrl: 'api/getFilms',
  // 获取所有城市接口,
  citysUrl: 'api/getcitys',
  // 获取城市ID接口, 参数:cityName 代表城市名称
  cityIdUrl: 'api/getcityId',
  // 获取影院接口, 参数:cityId 代表城市Id
  cinemasUrl: 'api/getCinemas',
  // 获取某部影片详细信息, 参数:filmId 代表电影Id
  filmItemUrl: 'api/getfilmItem',
  // 获取9.9拼团的信息
  teamBuyUrl: 'api/getTeamBuy',
  // 用户注册, 参数:userName和 userPsw
  userRegisterUrl: 'user/register',
  // 用户登录, 参数:userName和 userPsw
  userLoginrUrl: 'user/login',
};
