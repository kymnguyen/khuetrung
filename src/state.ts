import { atom, selector } from "recoil";
import {
  Booking,
  Cart,
  Location,
  MenuHome,
  Restaurant,
  TabType,
  VNeID,
} from "./models";
import { calcCrowFliesDistance } from "./utils/location";
import sdk from "./utils/sdk";

export const loginState = selector({
  key: "login",
  get: () => sdk.login(),
});

export const userState = selector({
  key: "user",
  get: async ({ get }) => {
    await get(loginState);
    const { userInfo } = await sdk.getUserInfo({});
    return userInfo;
  },
});

export const retryLocationState = atom({
  key: "retryLocation",
  default: 0,
});

export const positionState = selector<Location | undefined>({
  key: "position",
  get: async ({ get }) => {
    try {
      const allow = get(retryLocationState);
      if (allow) {
        await get(loginState);
        const { latitude, longitude } = await sdk.getLocation({});
        return {
          lat: Number(latitude),
          long: Number(longitude),
        };
      }
    } catch (error) {
      return undefined;
    }
    return undefined;
  },
});

export const restaurantsState = selector<Restaurant[]>({
  key: "restaurants",
  get: () => [
    {
      id: 1,
      name: "Chi nhánh - Lê Thánh Tôn",
      districtId: 1,
      rating: 4.5,
      location: {
        lat: 10.776463610730223,
        long: 106.70098038648123,
      },
      address: "15A Lê Thánh Tôn, Quận 1, Hồ Chí Minh",
      views: 100,
      image:
        "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      hours: {
        opening: [9, 0, "AM"],
        closing: [22, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "0123 456 789",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394868527438!2d106.70554879999999!3d10.781038700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f492daac79b%3A0x16e334e4778de0c1!2zMTVhIEzDqiBUaMOhbmggVMO0biwgQuG6v24gTmdow6ksIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1655781904560!5m2!1svi!2s",
    },
    {
      id: 2,
      name: "Chi nhánh - Trần Hưng Đạo",
      address: "15A Trần Hưng Đạo, Đa Kao, Quận 1, Hồ Chí Minh",
      districtId: 1,
      rating: 4.5,
      location: {
        lat: 10.755009040272618,
        long: 106.67897941334107,
      },
      views: 50,
      image:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      hours: {
        opening: [9, 0, "AM"],
        closing: [22, 0, "PM"],
      },
      days: {
        opening: 1,
        closing: 7,
      },
      hotline: "0123 456 789",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.585876004013!2d106.69000821538795!3d10.766364992328358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1640b88ca3%3A0x8d9f87825b5b807!2zMTIxLzE1IMSQLiBUcuG6p24gSMawbmcgxJDhuqFvLCBQaMaw4budbmcgUGjhuqFtIE5nxakgTMOjbywgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1655782080310!5m2!1svi!2s",
    },
  ],
});

export const categoriesState = selector({
  key: "categories",
  get: () => ["Pizza", "Pasta", "Salad", "Sandwich", "Drink"],
});

export const menuState = selector({
  key: "menu",
  get: ({ get }) => {
    const categories = get(categoriesState);
    const foods = get(foodsState);
    return {
      categories: categories.map((category, index) => ({
        id: String(index),
        name: category,
        foods: foods.filter((food) => food.categories.includes(category)),
      })),
    };
  },
});

export const menuHomeState = selector<MenuHome[]>({
  key: "menuHome",
  get: () => [
    {
      id: 0,
      name: "Định danh điện tử",
      icon: "https://zalo-egov-article-photo.zapps.me/adb181caf29f1bc1428e#273646063",
      router: "/vneid",
      url: "https://rd.zapps.vn/detail/2487050000180599437?zl3rd=815789662550058820&id=c3eb9fb83cfdd5a38cec&zarsrc=4",
    },
    {
      id: 1,
      name: "Dịch vụ công trực tuyến",
      icon: "https://zalo-egov-article-photo.zapps.me/7eb6c4c2b7975ec90786#273649273",
      router: "/public-service",
      url: "https://rd.zapps.vn/detail/2487050000180599437?id=1185a1dce6990fc75688&pageId=2487050000180599437",
    },
    {
      id: 2,
      name: "Video hướng dẫn",
      icon: "https://zalo-egov-article-photo.zapps.me/4b979a1a8152680c3143#220686970",
      router: "",
      url: "https://rd.zapps.vn/detail/2487050000180599437?id=17c7583ec27b2b25726a&pageId=2487050000180599437",
    },
    {
      id: 3,
      name: "Thủ tục hành chính",
      icon: "https://zalo-egov-article-photo.zapps.me/7eb6c4c2b7975ec90786#273649273",
      router: "",
      url: "https://rd.zapps.vn/detail/2487050000180599437?zl3rd=815789662550058820&id=456eaf9f0cdae584bccb&zarsrc=4",
    },
    {
      id: 4,
      name: "Phản ánh kiến nghị",
      icon: "https://zalo-egov-article-photo.zapps.me/adb181caf29f1bc1428e#273646063",
      router: "",
      url: "https://rd.zapps.vn/detail/2487050000180599437?id=a71b5feafcaf15f14cbe&pageId=2487050000180599437",
    },
    {
      id: 5,
      name: "Biểu mẫu",
      icon: "https://zalo-egov-article-photo.zapps.me/adb181caf29f1bc1428e#273646063",
      router: "",
      url: "https://rd.zapps.vn/detail/2487050000180599437?id=bcfa420be14e0810515f&pageId=2487050000180599437",
    },
    {
      id: 6,
      name: "Tra cứu hồ sơ",
      icon: "https://zalo-egov-article-photo.zapps.me/adb181caf29f1bc1428e#273646063",
      router: "",
      url: "https://docs.google.com/forms/d/1L5PD4OEfAiurKOTGBExFCCwzmWBY2xGFqrp1TChzDNk/edit?usp=forms_home&ths=true",
    },
    {
      id: 7,
      name: "Đăng ký shipper về tận tay",
      icon: "https://zalo-egov-article-photo.zapps.me/adb181caf29f1bc1428e#273646063",
      router: "",
      url: "https://docs.google.com/forms/d/1ZkbR2kBpNkPza1jrpp0CQ0EADnAHpVEduNXiSpx12fI/edit",
    },
    // {
    //   id: 8,
    //   name: "Truyền thông",
    //   icon: "https://zalo-egov-article-photo.zapps.me/adb181caf29f1bc1428e#273646063",
    //   router: "",
    //   url: "https://rd.zapps.vn/detail/2487050000180599437?id=2044dcb57ff096aecfe1&pageId=2487050000180599437",
    // },
    {
      id: 9,
      name: "Liên hệ",
      icon: "https://zalo-egov-article-photo.zapps.me/adb181caf29f1bc1428e#273646063",
      router: "",
      url: "https://rd.zapps.vn/detail/2487050000180599437?id=2eaacc5b6f1e8640df0f&pageId=2487050000180599437",
    },
  ],
});

export const PublicServiceState = selector<VNeID[]>({
  key: "publicServiceList",
  get: () => [
    {
      id: 1,
      name: "Hướng dẫn tạo tài khoản",
      detail: "",
      url: "https://rd.zapps.vn/detail/2487050000180599437?id=1185a1dce6990fc75688&pageId=2487050000180599437",
    },
    {
      id: 2,
      name: "Hướng dẫn đăng ký thường trú",
      detail: "",
      url: "https://tailieuhuongdan.dean06.vn/thutuc_t5.html",
    },
    {
      id: 3,
      name: "Hướng dẫn đăng kí tạm trú",
      detail: "",
      url: "https://tailieuhuongdan.dean06.vn/thutuc_t6.html",
    },
    {
      id: 4,
      name: "Hướng dẫn thông báo lưu trú",
      detail: "",
      url: "https://tailieuhuongdan.dean06.vn/thutuc_t8.html",
    },
    {
      id: 5,
      name: "Hướng dẫn khai báo tạm vắng",
      detail: "",
      url: "https://tailieuhuongdan.dean06.vn/thutuc_t7.html",
    },
    {
      id: 6,
      name: "Hướng dẫn đăng ký cấp hộ chiếu",
      detail: "",
    },
    {
      id: 7,
      name: "Hướng dẫn nộp phạt",
      detail: "",
    },
  ],
});

export const vneIDState = selector<VNeID[]>({
  key: "vneidList",
  get: () => [
    {
      id: 2,
      name: "VNeID đem lại lợi ích gì cho người dân?",
      detail: "",
    },
    {
      id: 3,
      name: "Tài khoản định danh điện tử có mấy loại?",
      detail:
        "Theo Nghị định 34 tài khoản định danh điện tử có 02 mức độ gồm, cụ thể: - Mức độ 1 là tài khoản được tạo lập trong trường hợp thông tin của công dân kê khai đã được so sánh, đối chiếu tự động trùng khớp với thông tin trong CSDL quốc gia về dân cư. Tài khoản được tạo lập trong trường hợp thông tin của người nước ngoài đã được so sánh, đối chiếu trùng khớp với thông tin trong CSDL quốc gia về xuất nhập cảnh, trừ ảnh chân dung và vân tay.- Mức độ 2 là tài khoản được tạo lập trong trường hợp thông tin của cá nhân kê khai đã được xác minh bằng ảnh chân dung hoặc vân tay trùng khớp với thông tin trong CSDL quốc gia về dân cư, CSDL căn cước công dân hoặc CSDL quốc gia về xuất nhập cảnh.",
    },
    {
      id: 4,
      name: "Hướng dẫn cài đặt app",
      detail: "",
    },
    {
      id: 5,
      name: "Hướng dẫn đăng ký tài khoản",
      detail:
        "Theo quy định hiện hành, công dân từ đủ 14 tuổi trở lên có quyền đăng ký tài khoản định danh điện tử thông qua ứng dụng định danh điện tử; người chưa đủ 14 tuổi thì được đăng ký thông qua tài khoản định danh điện tử của cha, mẹ hoặc người giám hộ, người được giám hộ khác thì đăng ký theo tài khoản định danh của người giám hộ.Theo số liệu thống kê của Liên minh Viễn thông Quốc tế (ITU), năm 2021 Việt Nam có 85.621.091 thuê bao di động đang hoạt động có sử dụng Internet băng rộng. Với những vai trò đã nêu, có thể nói ứng dụng VNeID đem đến nhiều tiện ích cho người dân, tổ chức. Chỉ cần kích hoạt tài khoản trên thiết bị thông minh, người dân, tổ chức sẽ được tiếp cận các dịch vụ công, đặc biệt là dịch vụ công trực tuyến, các giao dịch không cần giấy tờ, hạn chế mang theo giấy tờ hồ sơ hoặc rủi ro thất lạc giấy tờ... khi đã hoàn tất việc tích hợp thông tin hồ sơ của mình lên tài khoản định danh điện tử.Do đó, việc cài hoặc không cài đặt là quyền lợi của mỗi cá nhân, tổ chức, việc quyết định cài đặt hay không cài đặt do mỗi chúng ta, và mỗi người sẽ có cho mình một câu trả lời.",
    },
    {
      id: 6,
      name: "Hướng dẫn đăng ký tài khoản mức 1",
      detail:
        "Hiện chưa có báo cáo đánh giá về nguy cơ mất an toàn thông tin, việc cài đặt và kích hoạt thành công tài khoản được thực hiện theo quy trình chặt chẽ, có sự kết nối đồng bộ với các CSDL quốc gia về dân cư, CSDL căn cước công dân và CSDL về xuất nhập cảnh. Mọi thông tin đều được mã hóa và thực hiện theo các tiêu chuẩn bảo mật, an toàn thông tin bắt buộc.Để bảo đảm an toàn thông tin cá nhân, công dân, tổ chức cần quản lý chặt chẽ thiết bị đã kích hoạt tài khoản VNeID, không chia sẻ tài khoản, mật khẩu truy cập, mã OTP, Passcode trong suốt quá trình sử dụng ứng dụng và trong các giao dịch trực tuyến. Không cho người khác mượn thiết bị, trường hợp cho mượn phải đăng xuất tài khoản khỏi thiết bị và không cung cấp mã OTP cho bất cứ ai khi bản thân không thực hiện đăng nhập/đăng ký tài khoản vào thiết bị khác... Điều quan trọng là luôn cập nhật ứng dụng và đọc kỹ những khuyến nghị về an toàn thông tin khi cài đặt, kích hoạt và sử dụng ứng dụng.",
    },
    {
      id: 7,
      name: "Hướng dẫn đăng ký tài khoản mức 2",
      detail:
        "Hiện chưa có báo cáo đánh giá về nguy cơ mất an toàn thông tin, việc cài đặt và kích hoạt thành công tài khoản được thực hiện theo quy trình chặt chẽ, có sự kết nối đồng bộ với các CSDL quốc gia về dân cư, CSDL căn cước công dân và CSDL về xuất nhập cảnh. Mọi thông tin đều được mã hóa và thực hiện theo các tiêu chuẩn bảo mật, an toàn thông tin bắt buộc.Để bảo đảm an toàn thông tin cá nhân, công dân, tổ chức cần quản lý chặt chẽ thiết bị đã kích hoạt tài khoản VNeID, không chia sẻ tài khoản, mật khẩu truy cập, mã OTP, Passcode trong suốt quá trình sử dụng ứng dụng và trong các giao dịch trực tuyến. Không cho người khác mượn thiết bị, trường hợp cho mượn phải đăng xuất tài khoản khỏi thiết bị và không cung cấp mã OTP cho bất cứ ai khi bản thân không thực hiện đăng nhập/đăng ký tài khoản vào thiết bị khác... Điều quan trọng là luôn cập nhật ứng dụng và đọc kỹ những khuyến nghị về an toàn thông tin khi cài đặt, kích hoạt và sử dụng ứng dụng.",
    },
    {
      id: 8,
      name: "Hướng dẫn kích hoạt tài khoản",
      detail:
        "Hiện chưa có báo cáo đánh giá về nguy cơ mất an toàn thông tin, việc cài đặt và kích hoạt thành công tài khoản được thực hiện theo quy trình chặt chẽ, có sự kết nối đồng bộ với các CSDL quốc gia về dân cư, CSDL căn cước công dân và CSDL về xuất nhập cảnh. Mọi thông tin đều được mã hóa và thực hiện theo các tiêu chuẩn bảo mật, an toàn thông tin bắt buộc.Để bảo đảm an toàn thông tin cá nhân, công dân, tổ chức cần quản lý chặt chẽ thiết bị đã kích hoạt tài khoản VNeID, không chia sẻ tài khoản, mật khẩu truy cập, mã OTP, Passcode trong suốt quá trình sử dụng ứng dụng và trong các giao dịch trực tuyến. Không cho người khác mượn thiết bị, trường hợp cho mượn phải đăng xuất tài khoản khỏi thiết bị và không cung cấp mã OTP cho bất cứ ai khi bản thân không thực hiện đăng nhập/đăng ký tài khoản vào thiết bị khác... Điều quan trọng là luôn cập nhật ứng dụng và đọc kỹ những khuyến nghị về an toàn thông tin khi cài đặt, kích hoạt và sử dụng ứng dụng.",
    },
  ],
});

// export const vneIDState = selector<VNeID[]>({
//   key: "vneidList",
//   get: () => [
//     {
//       id: 1,
//       name: "Định danh điện tử là gì?",
//       detail:
//         "Ngày 08/11/2021, Thủ tướng Chính phủ ban hành Quyết định số 34/2021/QĐ-TTg quy định về định danh và xác thực điện tử trên nền tảng cơ sở dữ liệu (CSDL) quốc gia về dân cư, CSDL căn cước công dân và CSDL về xuất nhập cảnh (sau đây gọi là Quyết định 34), theo đó, định danh điện tử là hoạt động thu thập, tạo lập, gắn danh tính điện tử cho cá nhân và hoạt động quản lý danh tính điện tử. Danh tính điện tử là tập hợp dữ liệu số trong CSDL quốc gia về dân cư, CSDL căn cước công dân và CSDL quốc gia về xuất nhập cảnh cho phép xác định duy nhất một cá nhân trên môi trường điện tử. Do đó, định danh điện tử có thể hiểu theo cách đơn giản là xác thực cá nhân là duy nhất trên không gian mạng và bảo đảm quyền, lợi ích của cá nhân khi giao dịch, trao đổi thông tin trên không gian mạng. Ứng dụng VNeID là ứng dụng định danh điện tử do Bộ Công an trực tiếp quản lý bởi Trung tâm Dữ liệu Quốc gia về Dân cư (http://rarcenter.vn) có giá trị sử dụng thay thế các giấy tờ truyền thống, định danh công dân trên môi trường kỹ thuật số, cung cấp các tiện ích phát triển công dân số, chính phủ số, xã hội số. ",
//     },
//     {
//       id: 2,
//       name: "VNeID đem lại lợi ích gì cho người dân?",
//       detail: "",
//     },
//     {
//       id: 3,
//       name: "Tài khoản định danh điện tử có mấy loại?",
//       detail:
//         "Theo Nghị định 34 tài khoản định danh điện tử có 02 mức độ gồm, cụ thể: - Mức độ 1 là tài khoản được tạo lập trong trường hợp thông tin của công dân kê khai đã được so sánh, đối chiếu tự động trùng khớp với thông tin trong CSDL quốc gia về dân cư. Tài khoản được tạo lập trong trường hợp thông tin của người nước ngoài đã được so sánh, đối chiếu trùng khớp với thông tin trong CSDL quốc gia về xuất nhập cảnh, trừ ảnh chân dung và vân tay.- Mức độ 2 là tài khoản được tạo lập trong trường hợp thông tin của cá nhân kê khai đã được xác minh bằng ảnh chân dung hoặc vân tay trùng khớp với thông tin trong CSDL quốc gia về dân cư, CSDL căn cước công dân hoặc CSDL quốc gia về xuất nhập cảnh.",
//     },
//     {
//       id: 4,
//       name: "Ứng dụng VNeID để làm gì?",
//       detail: "",
//     },
//     {
//       id: 5,
//       name: "Có hay không nên cài đặt ứng dụng VNeID?",
//       detail:
//         "Theo quy định hiện hành, công dân từ đủ 14 tuổi trở lên có quyền đăng ký tài khoản định danh điện tử thông qua ứng dụng định danh điện tử; người chưa đủ 14 tuổi thì được đăng ký thông qua tài khoản định danh điện tử của cha, mẹ hoặc người giám hộ, người được giám hộ khác thì đăng ký theo tài khoản định danh của người giám hộ.Theo số liệu thống kê của Liên minh Viễn thông Quốc tế (ITU), năm 2021 Việt Nam có 85.621.091 thuê bao di động đang hoạt động có sử dụng Internet băng rộng. Với những vai trò đã nêu, có thể nói ứng dụng VNeID đem đến nhiều tiện ích cho người dân, tổ chức. Chỉ cần kích hoạt tài khoản trên thiết bị thông minh, người dân, tổ chức sẽ được tiếp cận các dịch vụ công, đặc biệt là dịch vụ công trực tuyến, các giao dịch không cần giấy tờ, hạn chế mang theo giấy tờ hồ sơ hoặc rủi ro thất lạc giấy tờ... khi đã hoàn tất việc tích hợp thông tin hồ sơ của mình lên tài khoản định danh điện tử.Do đó, việc cài hoặc không cài đặt là quyền lợi của mỗi cá nhân, tổ chức, việc quyết định cài đặt hay không cài đặt do mỗi chúng ta, và mỗi người sẽ có cho mình một câu trả lời.",
//     },
//     {
//       id: 6,
//       name: "Những rủi ro hạn chế nguy cơ mất an toàn thông tin sau khi cài đặt ứng dụng?",
//       detail:
//         "Hiện chưa có báo cáo đánh giá về nguy cơ mất an toàn thông tin, việc cài đặt và kích hoạt thành công tài khoản được thực hiện theo quy trình chặt chẽ, có sự kết nối đồng bộ với các CSDL quốc gia về dân cư, CSDL căn cước công dân và CSDL về xuất nhập cảnh. Mọi thông tin đều được mã hóa và thực hiện theo các tiêu chuẩn bảo mật, an toàn thông tin bắt buộc.Để bảo đảm an toàn thông tin cá nhân, công dân, tổ chức cần quản lý chặt chẽ thiết bị đã kích hoạt tài khoản VNeID, không chia sẻ tài khoản, mật khẩu truy cập, mã OTP, Passcode trong suốt quá trình sử dụng ứng dụng và trong các giao dịch trực tuyến. Không cho người khác mượn thiết bị, trường hợp cho mượn phải đăng xuất tài khoản khỏi thiết bị và không cung cấp mã OTP cho bất cứ ai khi bản thân không thực hiện đăng nhập/đăng ký tài khoản vào thiết bị khác... Điều quan trọng là luôn cập nhật ứng dụng và đọc kỹ những khuyến nghị về an toàn thông tin khi cài đặt, kích hoạt và sử dụng ứng dụng.",
//     },
//   ],
// });

export const foodsState = selector({
  key: "foods",
  get: () => [
    {
      id: 1,
      name: "Daily Pizza",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      categories: ["Pizza", "Pasta", "Salad", "Sandwich", "Drink"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
              selected: true,
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Prosciutto",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      categories: ["Pizza"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
              selected: true,
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Prosciutto",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80",
      categories: ["Pizza", "Drink"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
              selected: true,
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Daily Pizza",
      price: 400000,
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
      categories: ["Pizza", "Drink"],
      description: `Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.`,
      options: [
        {
          key: "cheese",
          label: "Thêm phô mai",
          selected: true,
        },
        {
          key: "no-onion",
          label: "Không hành",
          selected: false,
        },
        {
          key: "seafood",
          label: "Thêm hải sản",
          selected: false,
        },
      ],
      extras: [
        {
          key: "size",
          label: "Size (Khẩu phần)",
          options: [
            {
              key: "small",
              label: "Nhỏ",
            },
            {
              key: "medium",
              label: "Vừa",
            },
            {
              key: "large",
              label: "To",
            },
          ],
        },
      ],
    },
  ],
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const districtsState = selector({
  key: "districts",
  get: () => [
    {
      id: 1,
      name: "Quận 1",
    },
    {
      id: 5,
      name: "Quận 5",
    },
    {
      id: 7,
      name: "Quận 7",
    },
    {
      id: 13,
      name: "Thủ Đức",
    },
  ],
});

export const selectedDistrictState = atom({
  key: "selectedDistrict",
  default: 1,
});

export const popularRestaurantsState = selector<Restaurant[]>({
  key: "popularRestaurants",
  get({ get }) {
    const restaurants = get(restaurantsState);
    const keyword = get(keywordState);
    const selectedDistrict = get(selectedDistrictState);
    return restaurants
      .filter((restaurant) =>
        restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      )
      .filter(
        (restaurant) =>
          selectedDistrict === 0 || restaurant.districtId === selectedDistrict
      )
      .filter((restaurant) => restaurant.views >= 50);
  },
});

export const nearestRestaurantsState = selector<Restaurant[]>({
  key: "nearestRestaurants",
  get({ get }) {
    const restaurants = get(restaurantsState);
    const position = get(positionState);
    if (position) {
      return [...restaurants].sort((a, b) => {
        const aDistance = calcCrowFliesDistance(position, a.location);
        const bDistance = calcCrowFliesDistance(position, b.location);
        return aDistance - bDistance;
      });
    }
    return restaurants;
  },
});

export const currentRestaurantTabState = atom<TabType>({
  key: "currentRestaurantTab",
  default: "info",
});

export const cartState = atom<Cart>({
  key: "cart",
  default: {
    items: [],
  },
});

export const totalState = selector({
  key: "total",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.items.reduce(
      (total, item) => total + item.quantity * item.food.price,
      0
    );
  },
});

export const bookingsState = atom<Booking[]>({
  key: "bookings",
  default: [],
  effects: [
    ({ setSelf, getPromise }) => {
      // generate a demo booking item, can be safely deleted if you don't need it
      Promise.all([getPromise(restaurantsState), getPromise(foodsState)]).then(
        ([restaurants, foods]) => {
          setSelf((bookings) => [
            ...(Array.isArray(bookings) ? bookings : []),
            {
              id: "1234567890",
              restaurant: restaurants[0],
              cart: {
                items: [
                  {
                    quantity: 1,
                    food: foods[0],
                    note: "",
                  },
                  {
                    quantity: 2,
                    food: foods[1],
                    note: "Kèm ớt trái",
                  },
                ],
              },
              bookingInfo: {
                date: new Date(),
                hour: [20, 0, "PM"],
                table: "05",
                seats: 4,
              },
            },
          ]);
        }
      );
    },
  ],
});
