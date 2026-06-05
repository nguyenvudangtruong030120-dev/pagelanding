import { Story } from "../types";

export const DEFAULT_STORIES: Story[] = [
  {
    id: "story-1",
    fullName: "Nguyễn Lan Anh",
    email: "lananh.nguyen@gmail.com",
    phone: "0912345678",
    category: "Đôi lứa",
    title: "Sài Gòn - Melbourne: Mùa Đông Ấm Áp Bằng Những Cuộc Gọi Đêm",
    content: `Tôi nhớ như in cái lạnh của Melbourne tháng 7, khi ấy Sài Gòn đang sũng nước trong những cơn mưa rào bất tận. Chúng tôi cách nhau đúng 3 tiếng múi giờ và hơn 7,000km khoảng cách địa lý. Anh sang Úc du học ngành Công nghệ Thông tin, còn tôi tiếp tục guồng quay công việc tại Sài Gòn năng động.\n\nHành trình yêu xa của hai đứa bắt đầu như thế. Suốt hai năm, sợi dây liên kết duy nhất của chúng tôi là chiếc điện thoại thông minh cùng với chiếc màn hình nhỏ bé chập chờn sóng. Mỗi buổi tối, khi tôi vừa tan làm, thì ở Melbourne đã là đêm muộn. Anh vẫn thức đợi tôi, nhìn tôi qua camera, cùng kể nhau nghe chuyện một ngày đã qua.\n\nTình yêu vượt qua khoảng cách không chỉ cần niềm tin mà cần cả sự cảm thông sâu sắc. Những ngày lễ Tết, nhìn người ta có đôi có cặp, tủi thân dâng trào nhưng chỉ cần nghe giọng nói ấm áp từ đầu dây bên kia, mọi buồn tủi lại hóa mây khói. Chiếc vé máy bay khứ hồi kết nối Sài Gòn và Melbourne chính là món quà vô giá mà chúng tôi luôn mơ về mỗi ngày.\n\nGiờ đây, khi ngồi viết những lời này, chúng tôi đang chuẩn bị một hành trình mới - hành trình đoàn tụ mà Lotus Consulting hứa hẹn hỗ trợ. Tôi hy vọng câu chuyện này sẽ thắp lửa cho những trái tim đang yêu xa ngoài kia!`,
    likesCount: 142,
    createdAt: "2026-05-15T12:00:00Z",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
    status: "approved",
    aiReview: {
      summary: "Một câu chuyện ấm áp về tình yêu vượt qua sự khác biệt của thời tiết giữa Sài Gòn và Melbourne mùa đông, thể hiện sự thấu hiểu tuyệt vời của đôi lứa.",
      suggestions: [
        "Hãy viết thêm một chút cảm xúc khi anh gửi tặng món quà nhỏ từ Úc về Việt Nam để câu chuyện thêm điểm nhấn cảm xúc.",
        "Mô tả chi tiết hơn về ngày hẹn đầu tiên sau hai năm xa cách."
      ],
      emotionalScore: 92
    }
  },
  {
    id: "story-2",
    fullName: "Vũ Hải Đăng",
    email: "haidang.vu@gmail.com",
    phone: "0987654321",
    category: "Gia đình",
    title: "Hà Nội - Sydney: Khoảng Cách Địa Lý Không Thể Ngăn Cách Tình Thân",
    content: `Mẹ tôi sang Sydney định cư cùng gia đình em gái từ 5 năm trước. Kể từ ngày tiễn mẹ ở sân bay Nội Bài, tôi luôn cảm thấy ngôi nhà ở Hà Nội trống vắng một góc bình yên nhất. Với tôi, mẹ không chỉ là đấng sinh thành, mà còn là chỗ dựa tinh thần vô bờ bến.\n\nNhìn những bức ảnh mẹ chụp tại bến cảng Sydney, dưới chân nhà hát Opera nổi tiếng, tôi vừa mừng vừa nhớ thương. Mẹ luôn kể về cuộc sống thanh bình bên Úc, tiếng chim kêu lảnh lót mỗi sáng, và cách mẹ chăm sóc khu vườn nhỏ ngập tràn hoa hồng. Nhưng đằng sau nụ cười ấy, tôi biết mẹ vẫn đau đáu nhớ hương vị phở Hà Nội mùa lạnh, nhớ từng góc phố cổ xôn xao lá vàng rơi.\n\nHơn cả một câu chuyện tình yêu đôi lứa, tình thân chính là một sợi dây vô hình kết nối hai lục địa. Chúng tôi vẫn dạy mẹ gọi video call, gửi cho mẹ xem từng góc bếp, hướng dẫn mẹ cách đặt đồ trực tuyến tại quê nhà. Khoảng cách một đại dương chỉ làm cho ngày đoàn viên trở nên ý nghĩa gấp bội phần.\n\nMơ ước lớn nhất của tôi là có cơ hội bảo lãnh định cư sang Úc để phụng dưỡng mẹ những năm tháng tuổi già. Lotus Consulting chính là chiếc cầu nối kỳ diệu hiện thực hóa ước mơ đoàn tụ này của gia đình chúng tôi.`,
    likesCount: 98,
    createdAt: "2026-05-20T08:30:00Z",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800",
    status: "approved",
    aiReview: {
      summary: "Tình cảm mẫu tử thiêng liêng nối liền Hà Nội và Sydney. Bài viết chân thực, mộc mạc và gieo vào lòng người đọc sự ấm cúng nhẹ nhàng.",
      suggestions: [
        "Phần chia sẻ về khu vườn nhỏ ở Sydney rất đẹp, có thể nhấn mạnh thêm việc mẹ trồng những loài cây mang hương vị quê nhà.",
        "Lựa chọn những khoảnh khắc gọi điện ngày Tết làm gia vị tuyệt xúc cho câu chữ."
      ],
      emotionalScore: 89
    }
  },
  {
    id: "story-3",
    fullName: "Lê Thị Mỹ Linh",
    email: "mylinh.le@yahoo.com",
    phone: "0944455566",
    category: "Bạn tri kỷ",
    title: "Tri Kỷ Xông Pha: Hai Đứa Trẻ Hà Giang Và Giấc Mơ Brisbane",
    content: `Ai bảo yêu xa chỉ dành cho tình yêu nam nữ? Tôi và Lan là đôi bạn thân lớn lên ở bản vùng cao Hà Giang. Suốt tuổi thơ, hai đứa đi chung một đôi dép cao su, chia nhau củ khoai sắn lùi nóng hổi giữa gió lạnh Cao nguyên đá. Thế rồi tài năng và cơ duyên đã đưa Lan xuất sắc nhận học bổng toàn phần tiến sĩ tại Đại học Queensland, Brisbane, còn tôi bám trụ lại Hà Nội lập nghiệp.\n\nNgày bạn bay, tôi gom góp số tiền lương ít ỏi mua tặng bạn chiếc vòng bạc bản của người Mông. Sang Úc, Lan vẫn đeo nó trong mọi buổi hội thảo khoa học sang trọng. Lan bảo: 'Mỗi lần nhìn chiếc vòng, tao tự nhủ không được phép gục ngã vì Hà Giang luôn ở bên'.\n\nChúng tôi giữ kết nối qua những dòng tin nhắn thoại kéo dài hàng chục phút, chia sẻ về nỗi cô đơn xứ người, khó khăn khi hòa nhập văn hóa hay áp lực nghiên cứu. Yêu xa tri kỷ chính là động lực giúp cả hai cùng tiến bước vững vàng. Lotus Consulting không chỉ kiến tạo những tấm vé định cư lao động chất lượng cho người Việt mà còn mang tầm nhìn gắn kết bền vững. Thật tuyệt vời nếu chúng tôi có dịp tái ngộ tại xứ sở Kangaroo lộng lẫy!`,
    likesCount: 165,
    createdAt: "2026-06-01T14:15:00Z",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    status: "approved",
    aiReview: {
      summary: "Một câu chuyện độc đáo tôn vinh tình bạn tri kỷ vượt nghèo khó từ vùng cao Hà Giang vươn xa tới Brisbane, Úc. Rất cảm động và truyền cảm hứng mạnh mẽ.",
      suggestions: [
        "Sự liên hệ giữa chiếc vòng bạc truyền thống và thế giới nghiên cứu hiện đại tại Brisbane rất tinh tế. Nên đẩy mạnh chi tiết cảm động này."
      ],
      emotionalScore: 96
    }
  }
];
