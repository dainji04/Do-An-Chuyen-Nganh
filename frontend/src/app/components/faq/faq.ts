import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

// Định nghĩa kiểu dữ liệu
export interface FaqType {
  question: string;
  answer: string;
  active: boolean;
}

@Component({
  selector: 'app-faq',
  imports: [CommonModule, NzCollapseModule],
  templateUrl: './faq.html',
})
export class Faq {
  faqData: FaqType[] = [
    {
      question: 'Tại sao tôi nên mua điện thoại Android (bản quốc tế) tại cửa hàng của bạn?',
      answer:
        'Một chiếc điện thoại Android (phiên bản quốc tế) mua tại cửa hàng chúng tôi sẽ được mở khóa hoàn toàn. Điều này có nghĩa là bạn không bị ràng buộc với bất kỳ nhà cung cấp mạng hay hợp đồng dịch vụ nào. Bạn có thể tự do chọn nhà mạng và gói cước phù hợp nhất với mình, cả ở trong nước và khi đi du lịch.',
      active: false,
    },
    {
      question: 'Điện thoại Android của tôi có hoạt động trên toàn thế giới không?',
      answer:
        'Có. Các mẫu điện thoại Android mới nhất được bán tại cửa hàng (như của Samsung, Google, Xiaomi...) đều hỗ trợ đa băng tần 4G LTE và 5G. Bạn có thể sử dụng mạng quốc tế bằng cách chuyển vùng với nhà mạng của mình hoặc dễ dàng mua một SIM/eSIM tại quốc gia bạn đến.',
      active: false,
    },
    {
      question: 'Việc chuyển dữ liệu và thiết lập điện thoại Android mới có dễ không?',
      answer:
        'Rất đơn giản. Khi bạn thiết lập, chỉ cần đăng nhập vào Tài khoản Google của mình, mọi thứ như danh bạ, lịch, và ảnh (nếu dùng Google Photos) sẽ tự động đồng bộ. Nếu chuyển từ iPhone, ứng dụng "Chuyển sang Android" (Switch to Android) sẽ giúp bạn di chuyển dữ liệu. Ngoài ra, các hãng (như Samsung Smart Switch) cũng có công cụ truyền dữ liệu qua cáp hoặc không dây rất nhanh chóng.',
      active: false,
    },
    {
      question: 'Những nhà mạng nào tại Việt Nam cung cấp dịch vụ 5G?',
      answer:
        'Hầu hết các điện thoại Android đời mới bán tại cửa hàng đều hỗ trợ 5G. Để truy cập mạng 5G, bạn cần ở trong vùng phủ sóng và sử dụng SIM/gói cước 5G từ các nhà mạng lớn như Viettel, Mobifone, và Vinaphone. Vui lòng liên hệ nhà cung cấp của bạn để biết chi tiết về gói cước 5G.',
      active: false,
    },
  ];
}
