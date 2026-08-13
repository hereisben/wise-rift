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
    description: `Basic attacks and abilities against an enemy champion grant stacks, up to one per attack or cast. Applying 3 stacks to the same target within 3 seconds deals bonus adaptive damage.`,
    descriptionVi: `Đòn đánh thường và kỹ năng trúng tướng địch sẽ tạo cộng dồn, tối đa một cộng dồn cho mỗi đòn đánh hoặc lần sử dụng kỹ năng. Đặt đủ 3 cộng dồn lên cùng một mục tiêu trong vòng 3 giây sẽ gây thêm sát thương thích ứng.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `dark-harvest`,
    name: `Dark Harvest`,
    nameVi: `Thu Thập Hắc Ám`,
    description: `Damaging an enemy champion below 50% Health deals adaptive damage and harvests their soul, permanently increasing Dark Harvest's damage.`,
    descriptionVi: `Gây sát thương lên tướng địch còn dưới 50% Máu sẽ gây sát thương thích ứng và thu hoạch linh hồn của chúng, tăng vĩnh viễn sát thương của Thu Thập Hắc Ám.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `empowerment`,
    name: `Empowerment`,
    nameVi: `Cường Lực`,
    description: `Hitting an enemy champion with 3 consecutive basic attacks deals bonus adaptive damage and increases your damage dealt until you leave combat with champions.`,
    descriptionVi: `Đánh trúng tướng địch bằng 3 đòn đánh thường liên tiếp sẽ gây thêm sát thương thích ứng và tăng sát thương bạn gây ra cho đến khi rời khỏi giao tranh với tướng.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `lethal-tempo`,
    name: `Lethal Tempo`,
    nameVi: `Nhịp Độ Chết Người`,
    description: `Attacking enemy champions grants stacking Attack Speed, up to 6 stacks. At maximum stacks, gain bonus attack range and exceed the Attack Speed cap.`,
    descriptionVi: `Tấn công tướng địch sẽ nhận cộng dồn Tốc Độ Đánh, tối đa 6 cộng dồn. Khi đạt tối đa cộng dồn, nhận thêm tầm đánh và có thể vượt qua giới hạn Tốc Độ Đánh.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `fleet-footwork`,
    name: `Fleet Footwork`,
    nameVi: `Bước Chân Thần Tốc`,
    description: `Moving, attacking, and casting abilities builds Energy. At maximum Energy, your next attack gains Attack Speed, heals you, grants Movement Speed, and restores missing mana or energy when it hits an enemy champion.`,
    descriptionVi: `Di chuyển, tấn công và sử dụng kỹ năng sẽ tích lũy Năng Lượng. Khi đạt tối đa Năng Lượng, đòn đánh kế tiếp được tăng Tốc Độ Đánh, hồi máu, tăng Tốc Độ Di Chuyển và hồi năng lượng đã mất nếu trúng tướng địch.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `conqueror`,
    name: `Conqueror`,
    nameVi: `Chinh Phục`,
    description: `Basic attacks and abilities against enemy champions grant stacks of adaptive force. At maximum stacks, gain physical vamp and magical vamp.`,
    descriptionVi: `Đòn đánh thường và kỹ năng trúng tướng địch sẽ nhận cộng dồn Sức Mạnh Thích Ứng. Khi đạt cộng dồn tối đa, nhận Hút Máu Vật Lý và Hút Máu Phép.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `grasp-of-the-undying`,
    name: `Grasp of the Undying`,
    nameVi: `Quyền Năng Bất Diệt`,
    description: `Entering combat generates Grasp stacks. At 4 stacks, your next basic attack against an enemy champion deals bonus magic damage based on maximum health, heals you, and permanently grants bonus health. Effects are reduced for ranged champions.`,
    descriptionVi: `Khi bước vào giao tranh, nhận cộng dồn Quyền Năng Bất Diệt. Khi đạt 4 cộng dồn, đòn đánh thường kế tiếp lên tướng địch gây thêm sát thương phép theo Máu tối đa, hồi máu và tăng vĩnh viễn Máu cộng thêm. Hiệu ứng bị giảm đối với tướng đánh xa.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `guardian`,
    name: `Guardian`,
    nameVi: `Người Bảo Hộ`,
    description: `Guard nearby allies and allies you target with abilities. If either of you takes enough damage while guarded, both gain a temporary shield.`,
    descriptionVi: `Bảo hộ đồng minh ở gần và đồng minh được bạn nhắm đến bằng kỹ năng. Nếu một trong hai nhận đủ sát thương trong lúc được bảo hộ, cả hai sẽ nhận một lá chắn tạm thời.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `aery`,
    name: `Aery`,
    nameVi: `Aery`,
    description: `Basic attacks and abilities against enemy champions send Aery to deal adaptive damage. Healing, shielding, or buffing an ally sends Aery to shield them. Aery must return before she can be sent again.`,
    descriptionVi: `Đòn đánh thường và kỹ năng lên tướng địch sẽ đưa Aery đến gây sát thương thích ứng. Hồi máu, tạo lá chắn hoặc cường hóa đồng minh sẽ đưa Aery đến tạo lá chắn cho họ. Aery phải quay về trước khi có thể được triệu hồi lại.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `arcane-comet`,
    name: `Arcane Comet`,
    nameVi: `Thiên Thạch Bí Ẩn`,
    description: `Damaging an enemy champion with an ability launches a comet at their location. Each comet that hits an enemy champion permanently increases the damage of subsequent comets.`,
    descriptionVi: `Gây sát thương lên tướng địch bằng kỹ năng sẽ phóng một thiên thạch tới vị trí của chúng. Mỗi thiên thạch trúng tướng địch sẽ tăng vĩnh viễn sát thương của những thiên thạch tiếp theo.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `phase-rush`,
    name: `Phase Rush`,
    nameVi: `Tăng Tốc Pha`,
    description: `Hitting an enemy champion with 3 separate attacks or abilities within 3 seconds grants Movement Speed and Ability Haste, and reduces your current basic ability cooldowns.`,
    descriptionVi: `Đánh trúng tướng địch bằng 3 đòn đánh hoặc kỹ năng riêng biệt trong vòng 3 giây sẽ cho Tốc Độ Di Chuyển và Điểm Hồi Kỹ Năng, đồng thời giảm thời gian hồi chiêu hiện tại của các kỹ năng cơ bản.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `first-strike`,
    name: `First Strike`,
    nameVi: `Đòn Phủ Đầu`,
    description: `Damaging an enemy champion shortly after entering combat grants gold and activates First Strike, causing you to deal bonus true damage for a short duration. After the effect ends, gain bonus gold based on the bonus damage dealt.`,
    descriptionVi: `Gây sát thương lên tướng địch ngay sau khi bước vào giao tranh sẽ cho vàng và kích hoạt Đòn Phủ Đầu, giúp bạn gây thêm sát thương chuẩn trong thời gian ngắn. Khi hiệu ứng kết thúc, nhận thêm vàng dựa trên lượng sát thương cộng thêm đã gây ra.`,
    path: RunePath.KEYSTONE,
    slot: RuneSlot.KEYSTONE,
  },
  {
    key: `ice-overlord`,
    name: `Ice Overlord`,
    nameVi: `Bá Chủ Vùng Băng`,
    description: `Immobilizing an enemy champion creates an ice zone beneath them that slows enemies and grants you increased Armor and Magic Resistance. After a delay, the protective ice explodes around you, dealing magic damage.`,
    descriptionVi: `Làm bất động tướng địch sẽ tạo một vùng băng bên dưới chúng, làm chậm kẻ địch và tăng Giáp cùng Kháng Phép cho bạn. Sau một khoảng trễ, lớp băng bảo vệ phát nổ quanh bạn và gây sát thương phép.`,
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
    description: `After using a mobility effect or exiting stealth, damaging an enemy champion deals bonus true damage. At higher levels, the empowered hit gains additional effects.`,
    descriptionVi: `Sau khi sử dụng hiệu ứng dịch chuyển hoặc thoát khỏi trạng thái tàng hình, gây sát thương lên tướng địch sẽ gây thêm sát thương chuẩn. Ở cấp độ cao hơn, đòn đánh cường hóa nhận thêm hiệu ứng.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `empowered-attack`,
    name: `Empowered Attack`,
    nameVi: `Đòn Đánh Cường Hóa`,
    description: `Periodically empower your next attack to deal bonus adaptive damage. The bonus damage is reduced for ranged champions.`,
    descriptionVi: `Theo chu kỳ, đòn đánh kế tiếp được cường hóa để gây thêm sát thương thích ứng. Sát thương cộng thêm bị giảm đối với tướng đánh xa.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_1,
  },

  // DOMINATION SLOT 2
  {
    key: `chain-assault`,
    name: `Chain Assault`,
    nameVi: `Liên Kích`,
    description: `Hitting an enemy champion with an active ability marks them, causing your next 2 attacks or active ability casts against that target to deal bonus adaptive damage.`,
    descriptionVi: `Kỹ năng kích hoạt trúng tướng địch sẽ đặt dấu ấn lên chúng, khiến 2 đòn đánh hoặc lần sử dụng kỹ năng kích hoạt kế tiếp lên cùng mục tiêu gây thêm sát thương thích ứng.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `tyrant`,
    name: `Tyrant`,
    nameVi: `Bạo Chúa`,
    description: `Damaging an enemy champion below 50% Health deals bonus adaptive damage.`,
    descriptionVi: `Gây sát thương lên tướng địch còn dưới 50% Máu sẽ gây thêm sát thương thích ứng.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `hubris`,
    name: `Hubris`,
    nameVi: `Nguyệt Quế Cao Ngạo`,
    description: `Taking down an enemy champion shortly after damaging them temporarily grants Adaptive Force based on your champion kills.`,
    descriptionVi: `Tham gia hạ gục tướng địch ngay sau khi gây sát thương lên chúng sẽ tạm thời cho Sức Mạnh Thích Ứng dựa trên số mạng hạ gục tướng của bạn.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_2,
  },

  // DOMINATION SLOT 3
  {
    key: `eyeball-collector`,
    name: `Eyeball Collector`,
    nameVi: `Thu Thập Nhãn Cầu`,
    description: `Champion and epic monster takedowns permanently grant stacking Attack Damage or Ability Power.`,
    descriptionVi: `Tham gia hạ tướng địch và quái khủng sẽ tăng vĩnh viễn Sức Mạnh Công Kích hoặc Sức Mạnh Phép Thuật theo cộng dồn.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `ingenious-hunter`,
    name: `Ingenious Hunter`,
    nameVi: `Thợ Săn Tài Tình`,
    description: `Gain Item Ability Haste. Champion and epic monster takedowns permanently grant additional Item Ability Haste, up to 5 stacks.`,
    descriptionVi: `Nhận Điểm Hồi Kỹ Năng Trang Bị. Tham gia hạ gục tướng địch hoặc quái khủng sẽ tăng vĩnh viễn chỉ số này, tối đa 5 cộng dồn.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `relentless-hunter`,
    name: `Relentless Hunter`,
    nameVi: `Thợ Săn Tàn Nhẫn`,
    description: `Gain out-of-combat Movement Speed. Champion and epic monster takedowns permanently grant additional out-of-combat Movement Speed, up to 5 stacks.`,
    descriptionVi: `Nhận Tốc Độ Di Chuyển ngoài giao tranh. Tham gia hạ gục tướng địch hoặc quái khủng sẽ tăng vĩnh viễn chỉ số này, tối đa 5 cộng dồn.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `zombie-ward`,
    name: `Zombie Ward`,
    nameVi: `Mắt Thây Ma`,
    description: `Enemy ward takedowns and assists spawn a Zombie Ward and permanently grant stacking Attack Damage or Ability Power.`,
    descriptionVi: `Hạ hoặc hỗ trợ hạ mắt địch sẽ tạo một Mắt Thây Ma và tăng vĩnh viễn Sức Mạnh Công Kích hoặc Sức Mạnh Phép Thuật theo cộng dồn.`,
    path: RunePath.DOMINATION,
    slot: RuneSlot.SLOT_3,
  },

  // PRECISION SLOT 1
  {
    key: `brutal`,
    name: `Brutal`,
    nameVi: `Tàn Bạo`,
    description: `Attacks deal bonus adaptive damage to enemy champions.`,
    descriptionVi: `Đòn đánh lên tướng địch gây thêm sát thương thích ứng.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `triumph`,
    name: `Triumph`,
    nameVi: `Đắc Thắng`,
    description: `Champion takedowns restore missing Health, maximum Mana or Energy, and grant Movement Speed.`,
    descriptionVi: `Tham gia hạ gục tướng sẽ hồi Máu đã mất, hồi Mana hoặc Nội Năng theo giá trị tối đa và cho Tốc Độ Di Chuyển.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `battle-zeal`,
    name: `Battle Zeal`,
    nameVi: `Sĩ Khí`,
    description: `While in combat with an enemy champion, gain increasing basic ability damage amplification against that champion.`,
    descriptionVi: `Khi đang giao tranh với tướng địch, tăng dần sát thương kỹ năng cơ bản gây lên chính tướng đó.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_1,
  },

  // PRECISION SLOT 2
  {
    key: `last-stand`,
    name: `Last Stand`,
    nameVi: `Chốt Chặn Cuối Cùng`,
    description: `While below 60% Health, your attacks deal increased adaptive damage to enemy champions.`,
    descriptionVi: `Khi còn dưới 60% Máu, đòn đánh của bạn gây thêm sát thương thích ứng lên tướng địch.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `cut-down`,
    name: `Cut Down`,
    nameVi: `Đốn Hạ`,
    description: `Your attacks deal bonus adaptive damage to enemy champions above 60% Health.`,
    descriptionVi: `Đòn đánh của bạn gây thêm sát thương thích ứng lên tướng địch còn trên 60% Máu.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `coup-de-grace`,
    name: `Coup de Grace`,
    nameVi: `Nhát Chém Ân Huệ`,
    description: `Deal increased adaptive damage to enemy champions below 40% Health.`,
    descriptionVi: `Gây thêm sát thương thích ứng lên tướng địch còn dưới 40% Máu.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_2,
  },

  // PRECISION SLOT 3
  {
    key: `legend-alacrity`,
    name: `Legend: Alacrity`,
    nameVi: `Huyền Thoại: Tốc Độ Đánh`,
    description: `Participating in takedowns of monsters, enemy champions, and minions permanently grants stacking Attack Speed.`,
    descriptionVi: `Tham gia hạ quái, tướng địch và lính sẽ tăng vĩnh viễn Tốc Độ Đánh theo cộng dồn.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `legend-tenacity`,
    name: `Legend: Tenacity`,
    nameVi: `Huyền Thoại: Kháng Hiệu Ứng`,
    description: `Gain Tenacity and Slow Resistance. Takedowns of monsters, enemy champions, and minions permanently increase these bonuses up to a cap.`,
    descriptionVi: `Nhận Kháng Hiệu Ứng và Kháng Làm Chậm. Tham gia hạ quái, tướng địch và lính sẽ tăng vĩnh viễn các chỉ số này đến giới hạn tối đa.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `legend-bloodline`,
    name: `Legend: Bloodline`,
    nameVi: `Huyền Thoại: Hút Máu`,
    description: `Gain Omnivamp and permanently increase it by participating in takedowns of monsters, enemy champions, and minions.`,
    descriptionVi: `Nhận Hút Máu Toàn Phần và tăng vĩnh viễn chỉ số này khi tham gia hạ quái, tướng địch và lính.`,
    path: RunePath.PRECISION,
    slot: RuneSlot.SLOT_3,
  },

  // RESOLVE SLOT 1
  {
    key: `demolish`,
    name: `Demolish`,
    nameVi: `Tàn Phá Hủy Diệt`,
    description: `Charge while near an enemy turret. At maximum charges, your next attack against the turret deals bonus physical damage based on your maximum Health.`,
    descriptionVi: `Tích tụ sức mạnh khi đứng gần trụ địch. Khi đạt tối đa cộng dồn, đòn đánh kế tiếp lên trụ gây thêm sát thương vật lý dựa trên Máu tối đa của bạn.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `font-of-life`,
    name: `Font of Life`,
    nameVi: `Suối Nguồn Sinh Mệnh`,
    description: `Attacking or damaging an enemy champion with an ability heals you and the nearby allied champion with the lowest Health.`,
    descriptionVi: `Đòn đánh hoặc kỹ năng trúng tướng địch sẽ hồi máu cho bạn và tướng đồng minh gần đó có lượng Máu thấp nhất.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `courage-of-the-colossus`,
    name: `Courage of the Colossus`,
    nameVi: `Khổng Lồ Can Đảm`,
    description: `Immobilizing an enemy grants a temporary shield based partly on your maximum Health.`,
    descriptionVi: `Làm bất động kẻ địch sẽ cho bạn một lá chắn tạm thời, một phần dựa trên Máu tối đa của bản thân.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `unshakeable`,
    name: `Unshakeable`,
    nameVi: `Vững Vàng`,
    description: `Gain increased Armor and Magic Resistance, with additional defenses for each nearby enemy champion. At maximum nearby enemies, also gain Slow Resistance.`,
    descriptionVi: `Nhận thêm Giáp và Kháng Phép, đồng thời tăng thêm chống chịu với mỗi tướng địch ở gần. Khi đạt số lượng kẻ địch tối đa, nhận thêm Kháng Làm Chậm.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_1,
  },

  // RESOLVE SLOT 2
  {
    key: `second-wind`,
    name: `Second Wind`,
    nameVi: `Ngọn Gió Thứ Hai`,
    description: `Gain passive health regeneration. After taking damage from an enemy champion, regenerate additional health over time, with increased effectiveness for melee champions.`,
    descriptionVi: `Nhận hồi Máu thụ động. Sau khi chịu sát thương từ tướng địch, hồi thêm Máu theo thời gian. Hiệu ứng mạnh hơn đối với tướng cận chiến.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `nullifying-orb`,
    name: `Nullifying Orb`,
    nameVi: `Quả Cầu Hư Không`,
    description: `When damage from an enemy champion drops you below 35% Health, gain a temporary shield.`,
    descriptionVi: `Khi sát thương từ tướng địch khiến Máu của bạn tụt xuống dưới 35%, nhận một lá chắn tạm thời.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `bone-plating`,
    name: `Bone Plating`,
    nameVi: `Giáp Cốt`,
    description: `After an enemy champion attack triggers the rune, reduce the damage from that attack and the next two champion attacks.`,
    descriptionVi: `Sau khi một đòn đánh từ tướng địch kích hoạt ngọc, giảm sát thương của đòn đánh đó và hai đòn đánh từ tướng tiếp theo.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_2,
  },

  // RESOLVE SLOT 3
  {
    key: `overgrowth`,
    name: `Overgrowth`,
    nameVi: `Lan Tràn`,
    description: `Nearby minion and monster deaths permanently increase your maximum Health. At 30 stacks, gain additional percentage maximum Health.`,
    descriptionVi: `Lính và quái chết gần đó sẽ tăng vĩnh viễn Máu tối đa của bạn. Khi đạt 30 cộng dồn, nhận thêm phần trăm Máu tối đa.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `revitalize`,
    name: `Revitalize`,
    nameVi: `Tiếp Sức`,
    description: `Amplify healing and shields you provide, with increased effectiveness on low-health targets.`,
    descriptionVi: `Tăng hiệu quả hồi máu và lá chắn bạn cung cấp. Hiệu quả được tăng thêm khi mục tiêu còn ít Máu.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_3,
  },
  {
    key: `perseverance`,
    name: `Perseverance`,
    nameVi: `Bền Bỉ`,
    description: `Gain Tenacity. While immobilized, temporarily gain Armor and Magic Resistance, refreshing the duration when immobilized again.`,
    descriptionVi: `Nhận Kháng Hiệu Ứng. Khi bị bất động, tạm thời nhận thêm Giáp và Kháng Phép. Thời gian hiệu lực được làm mới nếu tiếp tục bị bất động.`,
    path: RunePath.RESOLVE,
    slot: RuneSlot.SLOT_3,
  },

  // SORCERY SLOT 1
  {
    key: `axiom-arcanist`,
    name: `Axiom Arcanist`,
    nameVi: `Bậc Thầy Nguyên Tố`,
    description: `Increase your ultimate ability's damage, healing, and shielding. Champion takedowns reduce its remaining cooldown.`,
    descriptionVi: `Tăng sát thương, hồi máu và lá chắn của chiêu cuối. Tham gia hạ gục tướng địch sẽ giảm thời gian hồi chiêu còn lại của chiêu cuối.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `manaflow-band`,
    name: `Manaflow Band`,
    nameVi: `Dải Băng Năng Lượng`,
    description: `Hitting an enemy champion with an ability or empowered attack permanently increases maximum Mana, up to a cap.`,
    descriptionVi: `Đánh trúng tướng địch bằng kỹ năng hoặc đòn đánh cường hóa sẽ tăng vĩnh viễn Mana tối đa, đến một giới hạn nhất định.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `botanist`,
    name: `Botanist`,
    nameVi: `Nhà Thực Vật Học`,
    description: `Destroying plants grants gold and empowers their effects.`,
    descriptionVi: `Phá hủy cây sẽ cho vàng và cường hóa hiệu ứng của cây đó.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_1,
  },
  {
    key: `hexflash`,
    name: `Hexflash`,
    nameVi: `Tốc Biến Ma Thuật`,
    description: `While Flash is on cooldown, it is replaced by Hex Flash. Channel to blink to a new location, with a minimum travel distance when released early.`,
    descriptionVi: `Khi Tốc Biến đang hồi chiêu, nó được thay thế bằng Tốc Biến Ma Thuật. Vận sức để dịch chuyển đến vị trí mới; nếu ngắt vận sức sớm, vẫn di chuyển quãng đường tối thiểu tương ứng với 1 giây vận sức.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_1,
  },

  // SORCERY SLOT 2
  {
    key: `transcendence`,
    name: `Transcendence`,
    nameVi: `Thăng Tiến Sức Mạnh`,
    description: `Gain Ability Haste at specific levels. At level 9, hitting a target with a basic ability reduces that ability's cooldown.`,
    descriptionVi: `Nhận Điểm Hồi Kỹ Năng ở các cấp độ nhất định. Từ cấp 9, khi kỹ năng cơ bản đánh trúng mục tiêu, thời gian hồi chiêu của kỹ năng đó được giảm.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `celerity`,
    name: `Celerity`,
    nameVi: `Mau Lẹ`,
    description: `Gain Movement Speed and amplify all bonus Movement Speed effects applied to you.`,
    descriptionVi: `Nhận thêm Tốc Độ Di Chuyển và tăng hiệu quả của mọi hiệu ứng Tốc Độ Di Chuyển cộng thêm tác dụng lên bản thân.`,
    path: RunePath.SORCERY,
    slot: RuneSlot.SLOT_2,
  },
  {
    key: `absolute-focus`,
    name: `Absolute Focus`,
    nameVi: `Tập Trung Tuyệt Đối`,
    description: `While above 65% Health, gain bonus Attack Damage or Ability Power based on level.`,
    descriptionVi: `Khi còn trên 65% Máu, nhận thêm Sức Mạnh Công Kích hoặc Sức Mạnh Phép Thuật theo cấp độ.`,
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
    description: `Destroying plants grants a temporary seed that replaces your trinket and can be planted at a target location. Seeds may also drop when allies destroy plants.`,
    descriptionVi: `Phá hủy cây sẽ cho một hạt giống tạm thời thay thế phụ kiện và có thể được gieo tại vị trí chỉ định. Hạt giống cũng có thể rơi ra khi đồng minh phá cây.`,
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
