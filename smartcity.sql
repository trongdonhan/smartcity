--
-- Cấu trúc bảng cho bảng `auth`
--

CREATE TABLE `auth` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `role` varchar(100) NOT NULL
);

--
-- Đang đổ dữ liệu cho bảng `auth`
--

INSERT INTO `auth` (`id`, `role`) VALUES
(1, 'admin'),
(2, 'user');


--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `username` varchar(100) NOT NULL PRIMARY KEY,
  `password` varchar(40) NOT NULL,
  `nameAc` varchar(100) NOT NULL,
  `id_auth` int(11) NOT NULL,
  FOREIGN KEY (`id_auth`) REFERENCES `auth` (`id`)
);

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`username`, `password`, `nameAc`, `id_auth`) VALUES
('taythanh', 'taythanh123', 'Phường Tây Thạnh', 2),
('sonky', 'sonky123', 'Phường Sơn Kỳ', 2),
('tanquy', 'tanquy123', 'Phường Tân Quý', 2),
('tansannhi', 'tansannhi123', 'Phường Tân Sân Nhì', 2),
('tanthanh', 'tanthanh123', 'Phường Tân Thành', 2),
('phuthohoa', 'phuthohoa123', 'Phường Phú Thọ Hòa', 2),
('hoathanh', 'hoathanh123', 'Phường Hòa Thạnh', 2),
('phuthanh', 'phuthanh123', 'Phường Phú Thạnh', 2),
('hieptan', 'hieptan123', 'Phường Hiệp Tân', 2),
('tanthoihoa', 'tanthoihoa123', 'Phường Tân Thới Hòa', 2),
('phutrung', 'phutrung123', 'Phường Phú Trung', 2),
('tanphu', 'tanphu123', 'Quận Tân Phú', 1);

-- --------------------------------------------------------


--
-- Cấu trúc bảng cho bảng `land_owner`
--

CREATE TABLE `land_owner` (
  `hoten` varchar(100) NOT NULL,
  `cmnd` varchar(40) NOT NULL PRIMARY KEY,
  `ngaycap` date NOT NULL,
  `diachicap` varchar(100) NOT NULL,
  `ngaysinh` date NOT NULL,
  `gioitinh` tinyint(1) NOT NULL,
  `quoctich` varchar(100) NOT NULL,
  `diachiTT` varchar(255) NOT NULL,
  `nghenghiep` varchar(255) NOT NULL,
  `sdt` varchar(255) NOT NULL
);

-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `land_violation`
--

CREATE TABLE `land_violation` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `diachiVP` varchar(255) NOT NULL,
  `thoigianVP` date NOT NULL,
  `thoigianLBB` date NOT NULL,
  `tienphat` bigint(11) NOT NULL,
  `tinhtrang` tinyint(1) NOT NULL,
  `id_chudat` varchar(40) NOT NULL,
  `id_acc` varchar(100) NOT NULL,
  `thoigianthucVi` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`id_chudat`) REFERENCES `land_owner` (`cmnd`),
  FOREIGN KEY (`id_acc`) REFERENCES `account` (`username`)

);

--
-- Cấu trúc bảng cho bảng `content`
--

CREATE TABLE `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `noidung` varchar(255) NOT NULL,
  `id_violation` int(11) NOT NULL,
  FOREIGN KEY (`id_violation`) REFERENCES `land_violation` (`id`)
);



--
-- Cấu trúc bảng cho bảng `work_daily`
--

CREATE TABLE `work_daily` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `ngayTT` date NOT NULL,
  `diachiCT` varchar(255) NOT NULL,
  `hientrangCT` varchar(255) NOT NULL,
  `canboPH` varchar(100) NOT NULL,
  `canboTN` varchar(100) NOT NULL,
  `xacnhan` tinyint(1) NOT NULL,
  `ghichu` varchar(255) DEFAULT NULL,
  `thoigianthuc` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_acc` varchar(100) DEFAULT NULL,
  FOREIGN KEY (`id_acc`) REFERENCES `account` (`username`)
);


--update 15/6/2019
create table docs(
    `id` varchar(255) not null PRIMARY key,
    `url` varchar(255) not null,
    `id_violation` int(10) not null,
    FOREIGN key (`id_violation`) REFERENCES `land_violation`(`id`),
`count_views` int(4) not null
);



CREATE table images_workdaily(
    `id` varchar(255) not null PRIMARY key,
    `url` varchar(255) not null,
    `id_WD` int(10) not null,
    FOREIGN key (`id_WD`) REFERENCES `work_daily`(`id`)
)

