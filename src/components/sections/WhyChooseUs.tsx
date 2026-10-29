import React from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Globe,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Stethoscope,
  Building,
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../../data/content';
import { HexagonFrame } from '../ui/HexagonFrame';

const iconMap: Record<string, React.ElementType> = {
  Award,
  Globe,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Stethoscope,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-28 surface-ice surface-ice--grid overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-2">
            <span>Engineering Excellence</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Accountability</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
            Why Partner with Silicon é Solution?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            We bridge the gap between initial architectural blueprints and decades of flawless technological operation.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = iconMap[item.icon] || CheckCircle2;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="glass-card p-6 rounded-3xl border border-[#0A8BD3]/15 shadow-xs hover:border-[#0A8BD3]/35 hover:shadow-lg transition-all text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="mb-4">
                    <HexagonFrame size={54} borderColor="rgba(10, 139, 211, 0.25)" bgColor="#E8F6FD">
                      <Icon className="w-5 h-5 text-[#0A8BD3] group-hover:scale-110 transition-transform" />
                    </HexagonFrame>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0B2545] font-display mb-2 group-hover:text-[#0866A8] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#8DC63F]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
