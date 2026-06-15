import { PrismaClient } from '../../src/generated/prisma/client.js';
import { RunePath, RuneSlot } from '../../src/generated/prisma/enums.js';

type RuneSeed = {
  key: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  iconUrl?: string | null;
  path: RunePath;
  slot: RuneSlot;
};

const runeSeeds: RuneSeed[] = [
  // KEYSTONE
  {
    key: `electrocute`,
    name: `Electrocute`,
    nameVi: `Sốc Điện`,
    description: `Hit an enemy champion with 3 separate attacks or abilities within 3 seconds to deal bonus adaptive damage.`,
    descriptionVi: `Trong vòng 3 giây, đánh trúng cùng một tướng địch với 3 đòn đánh thường hoặc kỹ năng sẽ gây thêm sát thương thích ứng lên mục tiêu.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `dark-harvest`,
    name: `Dark Harvest`,
    nameVi: `Thu Thập Hắc Ám`,
    description: `Damaging a low-health enemy champion deals adaptive damage and collects their soul, permanently increasing Dark Harvest damage.`,
    descriptionVi: `Gây sát thương lên tướng còn dưới 50% Máu sẽ gây sát thương thích ứng và thu hồn của kẻ đó, tăng vĩnh viễn sát thương của Thu Thập Hắc Ám.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `empowerment`,
    name: `Empowerment`,
    nameVi: `Cường Lực`,
    description: `Hitting an enemy champion with 3 consecutive attacks deals bonus adaptive damage and amplifies your damage against champions.`,
    descriptionVi: `Đánh trúng tướng địch bằng 3 đòn đánh liên tiếp sẽ gây thêm sát thương thích ứng và khuếch đại sát thương bạn gây ra lên tướng.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `lethal-tempo`,
    name: `Lethal Tempo`,
    nameVi: `Nhịp Độ Chết Người`,
    description: `Gain attack speed stacks when attacking enemy champions. At max stacks, gain attack range and ignore the attack speed cap.`,
    descriptionVi: `Nhận cộng dồn Tốc Độ Đánh khi tấn công tướng địch. Ở cộng dồn tối đa, nhận thêm tầm đánh và có thể bỏ qua giới hạn Tốc Độ Đánh.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `fleet-footwork`,
    name: `Fleet Footwork`,
    nameVi: `Bước Chân Thần Tốc`,
    description: `Moving, attacking, and casting builds Energized stacks. At 100 stacks, your next attack grants attack speed, healing, movement speed, and resource restore when hitting champions.`,
    descriptionVi: `Di chuyển, tấn công và sử dụng kỹ năng sẽ tăng cộng dồn Tích Điện. Khi đạt 100 cộng dồn, đòn đánh tiếp theo cho Tốc Độ Đánh, hồi máu, Tốc Độ Di Chuyển và hồi tài nguyên khi đánh tướng.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `conqueror`,
    name: `Conqueror`,
    nameVi: `Chinh Phục`,
    description: `Gain adaptive force stacks when separate attacks or abilities hit enemy champions. At max stacks, gain omnivamp.`,
    descriptionVi: `Nhận cộng dồn Sức Mạnh Thích Ứng khi các đòn đánh hoặc kỹ năng riêng biệt trúng tướng. Khi đạt cộng dồn tối đa, nhận thêm Hút Máu Toàn Phần.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `grasp-of-the-undying`,
    name: `Grasp of the Undying`,
    nameVi: `Quyền Năng Bất Diệt`,
    description: `Every few seconds in combat, your next attack against a champion is empowered to deal bonus magic damage, heal you, and permanently increase health.`,
    descriptionVi: `Mỗi 3 giây trong giao tranh, đòn đánh kế tiếp của bạn lên tướng sẽ được cường hóa, gây sát thương phép, hồi máu và tăng Máu vĩnh viễn.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `guardian`,
    name: `Guardian`,
    nameVi: `Người Bảo Hộ`,
    description: `Guard nearby allies and allies you target with abilities. If protected targets take enough damage, both receive a shield.`,
    descriptionVi: `Bảo vệ đồng minh gần bạn và đồng minh mà bạn nhắm đến bằng kỹ năng. Khi bạn hoặc đồng minh nhận đủ sát thương, cả hai nhận một lá chắn.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `summon-aery`,
    name: `Summon Aery`,
    nameVi: `Aery`,
    description: `Attacks and abilities send Aery to the target, damaging enemies or shielding allies.`,
    descriptionVi: `Đòn đánh và kỹ năng đưa Aery đến chỗ mục tiêu, gây sát thương kẻ địch hoặc che chắn cho đồng minh.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `arcane-comet`,
    name: `Arcane Comet`,
    nameVi: `Thiên Thạch Bí Ẩn`,
    description: `Damaging a champion with an ability drops a comet at their location. Comet damage increases when it hits enemy champions.`,
    descriptionVi: `Gây sát thương lên tướng bằng kỹ năng sẽ thả một thiên thạch xuống chỗ kẻ đó. Khi thiên thạch trúng tướng địch, sát thương thiên thạch tiếp theo sẽ gia tăng.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `phase-rush`,
    name: `Phase Rush`,
    nameVi: `Tăng Tốc Pha`,
    description: `Hit an enemy champion 3 times with attacks or abilities within 4 seconds to gain movement speed and reduce remaining basic ability cooldowns.`,
    descriptionVi: `Sử dụng đòn đánh thường hoặc kỹ năng lên tướng địch 3 lần trong vòng 4 giây sẽ tăng Tốc Độ Di Chuyển và giảm thời gian hồi chiêu còn lại của kỹ năng cơ bản.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `first-strike`,
    name: `First Strike`,
    nameVi: `Đòn Phủ Đầu`,
    description: `Starting combat with an enemy champion grants gold and causes you to deal bonus true damage for a short duration, then grants bonus gold based on bonus damage dealt.`,
    descriptionVi: `Khởi đầu giao tranh với tướng địch hoặc gây sát thương lên chúng ngay sau khi bắt đầu giao tranh sẽ cho vàng và cho phép gây thêm sát thương chuẩn trong thời gian ngắn.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `glacial-augment`,
    name: `Glacial Augment`,
    nameVi: `Bá Chủ Vùng Băng`,
    description: `Immobilizing an enemy champion creates slowing zones and grants defensive power. After a short delay, ice explodes around you and deals magic damage.`,
    descriptionVi: `Vô hiệu hóa một tướng địch sẽ tạo vùng băng làm chậm, tăng chống chịu cho bản thân và gây sát thương phép xung quanh sau một khoảng trễ ngắn.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },

  // DOMINATION SLOT 1
  {
    key: `cheap-shot`,
    name: `Cheap Shot`,
    nameVi: `Phát Bắn Đơn Giản`,
    description: `Deal bonus true damage to movement-impaired enemies.`,
    descriptionVi: `Gây thêm sát thương chuẩn lên kẻ địch bị hạn chế di chuyển.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `sudden-impact`,
    name: `Sudden Impact`,
    nameVi: `Tác Động Bất Chợt`,
    description: `After dashing, blinking, teleporting, or leaving stealth, your next attack or ability against a champion deals bonus true damage.`,
    descriptionVi: `Sau khi lướt, nhảy, dịch chuyển hoặc thoát trạng thái tàng hình, đòn đánh hoặc kỹ năng kế tiếp lên tướng địch gây thêm sát thương chuẩn.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `empowered-attack`,
    name: `Empowered Attack`,
    nameVi: `Đòn Đánh Cường Hóa`,
    description: `Periodically empower your next attack to deal bonus adaptive damage to enemy champions.`,
    descriptionVi: `Sau mỗi 8 giây, đòn đánh tiếp theo được cường hóa, gây thêm sát thương thích ứng lên tướng địch.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_1,
  },

  // DOMINATION SLOT 2
  {
    key: `mark-of-the-weak`,
    name: `Mark of the Weak`,
    nameVi: `Liên Kích`,
    description: `Damaging an enemy champion with an active ability marks them, causing your next attacks or abilities against them to deal bonus adaptive damage.`,
    descriptionVi: `Gây sát thương lên tướng địch bằng kỹ năng kích hoạt sẽ đặt dấu ấn lên chúng, khiến 2 đòn đánh hoặc kỹ năng kích hoạt kế tiếp gây thêm sát thương thích ứng.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `giant-slayer-domination`,
    name: `Giant Slayer`,
    nameVi: `Bạo Chúa`,
    description: `Damaging an enemy champion below 50% health deals bonus adaptive damage.`,
    descriptionVi: `Khi gây sát thương lên một tướng dưới 50% Máu, gây thêm sát thương thích ứng.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `prideful-laurel`,
    name: `Prideful Laurel`,
    nameVi: `Nguyệt Quế Cao Ngạo`,
    description: `Takedowns shortly after damaging an enemy champion grant temporary adaptive force, stacking with champion takedowns.`,
    descriptionVi: `Tham gia hạ gục tướng địch trong vòng 3 giây sau khi gây sát thương lên chúng sẽ cho Sức Mạnh Thích Ứng trong 30 giây.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_2,
  },

  // DOMINATION SLOT 3
  {
    key: `eyeball-collector`,
    name: `Eyeball Collector`,
    nameVi: `Thu Thập Nhãn Cầu`,
    description: `Gain adaptive stats after champion or epic monster takedowns, up to a maximum number of stacks.`,
    descriptionVi: `Tăng Sức Mạnh Công Kích hoặc Sức Mạnh Phép Thuật sau khi tham gia hạ gục tướng hoặc quái khủng, cộng dồn tối đa 8 lần.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `ingenious-hunter`,
    name: `Ingenious Hunter`,
    nameVi: `Thợ Săn Tài Tình`,
    description: `Gain item ability haste. Champion or epic monster takedowns grant additional item ability haste stacks.`,
    descriptionVi: `Nhận Điểm Hồi Kỹ Năng Trang Bị. Mỗi lần hạ gục tướng hoặc quái khủng, nhận thêm Điểm Hồi Kỹ Năng Trang Bị.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `relentless-hunter`,
    name: `Relentless Hunter`,
    nameVi: `Thợ Săn Tàn Nhẫn`,
    description: `Gain out-of-combat movement speed. Champion or epic monster takedowns grant additional movement speed stacks.`,
    descriptionVi: `Nhận Tốc Độ Di Chuyển ngoài giao tranh. Mỗi lần hạ gục tướng hoặc quái khủng, nhận thêm Tốc Độ Di Chuyển ngoài giao tranh.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `zombie-ward`,
    name: `Zombie Ward`,
    nameVi: `Mắt Thây Ma`,
    description: `Assisting in destroying enemy wards creates a Zombie Ward and grants adaptive stats, stacking up to a limit.`,
    descriptionVi: `Tham gia phá mắt của phe địch sẽ tạo ra một Mắt Thây Ma và tăng Sức Mạnh Công Kích hoặc Sức Mạnh Phép Thuật.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_3,
  },

  // PRECISION SLOT 1
  {
    key: `brutal`,
    name: `Brutal`,
    nameVi: `Tàn Bạo`,
    description: `Attacks deal bonus adaptive damage to enemy champions.`,
    descriptionVi: `Các đòn đánh gây sát thương thích ứng cộng thêm lên tướng địch.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `triumph`,
    name: `Triumph`,
    nameVi: `Đắc Thắng`,
    description: `Champion takedowns restore missing health and resource, and grant movement speed.`,
    descriptionVi: `Tham gia hạ gục tướng sẽ hồi Máu đã mất, Năng Lượng hoặc Nội Năng tối đa, đồng thời cho Tốc Độ Di Chuyển.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `courage`,
    name: `Courage`,
    nameVi: `Sĩ Khí`,
    description: `Gain stacking basic ability damage amplification while in combat with champions.`,
    descriptionVi: `Nhận khuếch đại sát thương kỹ năng cơ bản, cộng dồn khi đang giao tranh với tướng.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_1,
  },

  // PRECISION SLOT 2
  {
    key: `last-stand`,
    name: `Last Stand`,
    nameVi: `Chốt Chặn Cuối Cùng`,
    description: `Deal increased adaptive damage to enemy champions while at low health.`,
    descriptionVi: `Khi Máu dưới 60%, các đòn đánh lên tướng địch gây thêm sát thương thích ứng. Tối đa khi Máu dưới 30%.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `giant-slayer`,
    name: `Giant Slayer`,
    nameVi: `Đốn Hạ`,
    description: `Attacks and abilities deal bonus adaptive damage to enemy champions above 60% health.`,
    descriptionVi: `Các đòn đánh và kỹ năng gây thêm sát thương thích ứng lên tướng địch có trên 60% Máu.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `coup-de-grace`,
    name: `Coup de Grace`,
    nameVi: `Nhát Chém Ân Huệ`,
    description: `Deal increased adaptive damage to enemy champions below 40% health.`,
    descriptionVi: `Gây thêm sát thương thích ứng lên tướng địch còn dưới 40% Máu.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_2,
  },

  // PRECISION SLOT 3
  {
    key: `legend-alacrity`,
    name: `Legend: Alacrity`,
    nameVi: `Huyền Thoại Tốc Độ Đánh`,
    description: `Gain attack speed and stack additional attack speed from takedowns.`,
    descriptionVi: `Nhận Tốc Độ Đánh. Tham gia hạ gục quái, tướng địch hoặc lính để nhận thêm Tốc Độ Đánh.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `legend-tenacity`,
    name: `Legend: Tenacity`,
    nameVi: `Huyền Thoại Kháng Hiệu Ứng`,
    description: `Gain tenacity and slow resist, stacking additional values from takedowns.`,
    descriptionVi: `Nhận Kháng Hiệu Ứng và Kháng Làm Chậm. Tham gia hạ gục để nhận thêm chỉ số.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `legend-bloodline`,
    name: `Legend: Bloodline`,
    nameVi: `Huyền Thoại Hút Máu`,
    description: `Gain omnivamp and stack additional omnivamp from takedowns.`,
    descriptionVi: `Nhận Hút Máu Toàn Phần. Tham gia hạ gục quái, tướng địch hoặc lính để nhận thêm Hút Máu Toàn Phần.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_3,
  },

  // RESOLVE SLOT 1
  {
    key: `demolish`,
    name: `Demolish`,
    nameVi: `Tàn Phá Hủy Diệt`,
    description: `Charge up near enemy turrets. At max charge, your next attack against a turret deals bonus physical damage based on maximum health.`,
    descriptionVi: `Khi ở gần trụ địch, nhận cộng dồn vận sức. Khi đã vận tối đa, đòn đánh thường tiếp theo lên trụ gây thêm sát thương vật lý theo Máu tối đa.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `font-of-life`,
    name: `Font of Life`,
    nameVi: `Suối Nguồn Định Mệnh`,
    description: `Hitting enemy champions with attacks or abilities heals yourself and the lowest-health nearby ally.`,
    descriptionVi: `Khi đòn đánh hoặc kỹ năng trúng tướng địch, hồi máu cho bản thân và tướng đồng minh thấp Máu nhất gần đó.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `courage-of-the-colossus`,
    name: `Courage of the Colossus`,
    nameVi: `Khổng Lồ Can Đảm`,
    description: `Immobilizing an enemy champion grants a shield based on level and maximum health.`,
    descriptionVi: `Khi làm bất động tướng địch, nhận lá chắn hấp thụ sát thương trong 3 giây.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `perseverance`,
    name: `Perseverance`,
    nameVi: `Vững Vàng`,
    description: `Gain armor and magic resist. Gain more resistances for each nearby enemy champion, and slow resist when surrounded.`,
    descriptionVi: `Nhận Giáp và Kháng Phép. Với mỗi tướng địch ở gần, nhận thêm Giáp và Kháng Phép. Khi có tối đa tướng địch ở gần, nhận thêm Kháng Làm Chậm.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_1,
  },

  // RESOLVE SLOT 2
  {
    key: `second-wind`,
    name: `Second Wind`,
    nameVi: `Ngọn Gió Thứ Hai`,
    description: `Gain health regeneration. After taking damage from an enemy champion, regenerate health over time.`,
    descriptionVi: `Tăng hồi Máu theo thời gian. Sau khi nhận sát thương từ tướng địch, hồi lại Máu trong vài giây tiếp theo.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `nullifying-orb`,
    name: `Nullifying Orb`,
    nameVi: `Quả Cầu Hư Không`,
    description: `When champion damage would drop you below low health, gain a shield for a short duration.`,
    descriptionVi: `Nếu sát thương từ tướng địch khiến Máu tụt xuống dưới 35%, nhận một lá chắn trong 4 giây.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `bone-plating`,
    name: `Bone Plating`,
    nameVi: `Giáp Cốt`,
    description: `After taking damage from a champion, reduce the current and next few instances of champion damage for a short duration.`,
    descriptionVi: `Khi nhận sát thương từ tướng, sát thương hiện tại và 3 kỹ năng hoặc đòn đánh tiếp theo từ tướng lên bạn sẽ được giảm.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_2,
  },

  // RESOLVE SLOT 3
  {
    key: `overgrowth`,
    name: `Overgrowth`,
    nameVi: `Lan Tràn`,
    description: `Gain permanent maximum health from nearby minion and monster deaths. Gain bonus maximum health at enough stacks.`,
    descriptionVi: `Với mỗi lính hoặc quái bị tiêu diệt ở gần, nhận vĩnh viễn Máu tối đa. Nhận thêm phần trăm Máu tối đa khi đạt đủ cộng dồn.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `revitalize`,
    name: `Revitalize`,
    nameVi: `Tiếp Sức`,
    description: `Increase healing and shielding effects, with greater effect on low-health targets.`,
    descriptionVi: `Tăng hiệu ứng hồi máu hoặc tạo lá chắn. Nếu mục tiêu còn dưới 40% Máu, hiệu ứng tăng thêm.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `tenacity`,
    name: `Tenacity`,
    nameVi: `Bền Bỉ`,
    description: `Gain tenacity. When immobilized, gain armor and magic resist briefly.`,
    descriptionVi: `Nhận Kháng Hiệu Ứng. Khi bị bất động, nhận Giáp và Kháng Phép trong thời gian ngắn.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_3,
  },

  // SORCERY SLOT 1
  {
    key: `elemental-master`,
    name: `Elemental Master`,
    nameVi: `Bậc Thầy Nguyên Tố`,
    description: `Increase ultimate damage, healing, and shielding. Champion takedowns reduce remaining ultimate cooldown.`,
    descriptionVi: `Chiêu cuối được tăng sát thương, hồi máu và tạo lá chắn. Tham gia hạ gục tướng địch sẽ giảm thời gian hồi chiêu còn lại của chiêu cuối.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `manaflow-band`,
    name: `Manaflow Band`,
    nameVi: `Dải Băng Năng Lượng`,
    description: `Hitting an enemy champion with an ability or empowered attack permanently increases maximum mana, up to a cap.`,
    descriptionVi: `Đánh trúng tướng địch bằng kỹ năng hoặc đòn đánh cường hóa sẽ tăng vĩnh viễn năng lượng tối đa, tối đa 300 Năng Lượng.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `sweet-tooth`,
    name: `Sweet Tooth`,
    nameVi: `Nhà Thực Vật Học`,
    description: `Destroying plants grants gold and empowered plant effects.`,
    descriptionVi: `Khi phá hủy một cây, nhận vàng và hiệu ứng cây cường hóa. Một số cây gần trụ cho hiệu ứng bổ sung.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `hexflash`,
    name: `Hexflash`,
    nameVi: `Tốc Biến Ma Thuật`,
    description: `While Flash is on cooldown, it is replaced by Hexflash, allowing a short dash based on channel time.`,
    descriptionVi: `Khi Tốc Biến đang hồi chiêu, nó được thay thế bằng Tốc Biến Ma Thuật. Lướt đi một khoảng ngắn dựa trên thời gian vận sức.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_1,
  },

  // SORCERY SLOT 2
  {
    key: `transcendence`,
    name: `Transcendence`,
    nameVi: `Thăng Tiến Sức Mạnh`,
    description: `Gain ability haste at certain levels. Later, basic ability hits reduce that ability's cooldown.`,
    descriptionVi: `Nhận Điểm Hồi Kỹ Năng ở các cấp độ nhất định. Ở cấp cao hơn, khi kỹ năng cơ bản trúng mục tiêu sẽ giảm hồi chiêu của kỹ năng đó.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `celerity`,
    name: `Celerity`,
    nameVi: `Mau Lẹ`,
    description: `Gain movement speed and increase all bonus movement speed effects.`,
    descriptionVi: `Tăng Tốc Độ Di Chuyển. Tất cả thưởng Tốc Độ Di Chuyển của bạn cũng được tăng thêm.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `absolute-focus`,
    name: `Absolute Focus`,
    nameVi: `Tập Trung Tuyệt Đối`,
    description: `While above a health threshold, gain adaptive force.`,
    descriptionVi: `Khi có nhiều hơn 65% Máu, nhận thêm Sức Mạnh Công Kích hoặc Sức Mạnh Phép Thuật thích ứng.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_2,
  },

  // SORCERY SLOT 3
  {
    key: `scorch`,
    name: `Scorch`,
    nameVi: `Thiêu Rụi`,
    description: `Damaging enemy champions with abilities burns them for bonus magic damage after a delay.`,
    descriptionVi: `Gây sát thương lên tướng địch bằng kỹ năng sẽ thiêu cháy chúng, gây thêm sát thương phép sau 1 giây.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `nimbus-cloak`,
    name: `Nimbus Cloak`,
    nameVi: `Áo Choàng Mây`,
    description: `After using a summoner spell, gain bonus movement speed for a short duration.`,
    descriptionVi: `Sau khi dùng Phép, tăng Tốc Độ Di Chuyển cộng thêm trong 3 giây. Lượng tăng tốc phụ thuộc vào thời gian hồi chiêu của Phép.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `gathering-storm`,
    name: `Gathering Storm`,
    nameVi: `Cuồng Phong Tích Tụ`,
    description: `Starting at 6 minutes, gain increasing adaptive force every 3 minutes.`,
    descriptionVi: `Từ phút thứ 6 sau khi trận đấu bắt đầu, nhận thêm Sức Mạnh Công Kích hoặc Sức Mạnh Phép Thuật thích ứng, tăng sau mỗi 3 phút.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `ixtali-seedjar`,
    name: `Ixtali Seedjar`,
    nameVi: `Lọ Đựng Hạt Ixtal`,
    description: `After destroying a plant, receive a seed that can be planted later. Some placed plants have enhanced effects.`,
    descriptionVi: `Sau khi phá hủy cây, lập tức nhận một hạt giống thay thế cho phụ kiện trong 60 giây. Hạt giống có thể được gieo tại vị trí chỉ định.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_3,
  },
];

export async function seedRunes(prisma: PrismaClient) {
  console.log(`SEEDING RUNES...`);

  for (const runeSeed of runeSeeds) {
    await prisma.rune.upsert({
      where: {
        key: runeSeed.key,
      },
      update: {
        name: runeSeed.name,
        nameVi: runeSeed.nameVi,
        description: runeSeed.description,
        descriptionVi: runeSeed.descriptionVi,
        iconUrl: runeSeed.iconUrl ?? null,
        path: runeSeed.path,
        slot: runeSeed.slot,
        deletedAt: null,
      },
      create: {
        key: runeSeed.key,
        name: runeSeed.name,
        nameVi: runeSeed.nameVi,
        description: runeSeed.description,
        descriptionVi: runeSeed.descriptionVi,
        iconUrl: runeSeed.iconUrl ?? null,
        path: runeSeed.path,
        slot: runeSeed.slot,
      },
    });

    console.log(`Seeded rune: ${runeSeed.name}`);
  }

  console.log(`SEEDED RUNES`);
}
