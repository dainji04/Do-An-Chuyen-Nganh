import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  stats = [
    { label: 'Năm thành lập', value: '2020' },
    { label: 'Sản phẩm', value: '500+' },
    { label: 'Khách hàng', value: '10,000+' },
    { label: 'Chi nhánh', value: '15' },
  ];

  values = [
    {
      icon: '🎯',
      title: 'Chất lượng',
      description: 'Cam kết mang đến sản phẩm chính hãng, chất lượng cao nhất',
    },
    {
      icon: '💡',
      title: 'Sáng tạo',
      description: 'Luôn cập nhật công nghệ mới nhất và xu hướng hiện đại',
    },
    {
      icon: '🤝',
      title: 'Tận tâm',
      description: 'Đặt khách hàng làm trung tâm trong mọi hoạt động',
    },
    {
      icon: '⚡',
      title: 'Nhanh chóng',
      description: 'Giao hàng nhanh, dịch vụ hỗ trợ 24/7',
    },
  ];
}
