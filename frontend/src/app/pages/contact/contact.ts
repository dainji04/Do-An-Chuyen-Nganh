import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  contactInfo = [
    {
      icon: '📍',
      title: 'Địa chỉ',
      content: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    },
    {
      icon: '📞',
      title: 'Điện thoại',
      content: '1900 1234',
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'support@cuahang.vn',
    },
    {
      icon: '🕐',
      title: 'Giờ làm việc',
      content: 'T2-CN: 8:00 - 22:00',
    },
  ];
}
