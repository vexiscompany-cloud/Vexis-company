import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram, Youtube, MessageCircle, CheckCircle2, ChevronRight } from 'lucide-react';

const Search = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const Target = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const BarChart = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
);


const HERO_IMAGE_BASE64 = "data:image/png;base64,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";

const METODOLOGIA_STEPS = [
  {
    title: "ESTRATÉGIA",
    desc: "Atração do público certo com o anúncio exato para que os clientes cheguem até você.",

    icon: <Search className="w-8 h-8 text-gold" />
  },
  {
    title: "AUTORIDADE",
    desc: "Criação de conteúdo e posicionamento que passam confiança imediata.",
    icon: <Target className="w-8 h-8 text-gold" />
  },
  {
    title: "AQUECIMENTO",
    desc: "Nutrição rápida dos leads para que cheguem prontos para a visita.",
    icon: <Users className="w-8 h-8 text-gold" />
  },
  {
    title: "GERAÇÃO",
    desc: "Mecanismo de escala para repetir o processo e bater metas todo mês.",
    icon: <BarChart className="w-8 h-8 text-gold" />
  }
];

const CHECKLIST_ITEMS = [
  "Trabalha muito e vende pouco?",
  "Depende apenas de indicações e portais?",
  "Sente que sua presença digital é fraca?",
  "Atende leads 'curiosos' que não têm dinheiro?",
  "Não sabe como escalar seus anúncios?"
];

export default function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    empresa: '',
    experiencia: 'Nunca fiz anúncios'
  });

  const handleWhatsApp = () => {
    window.location.href = "https://wa.me/5591988626328";
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá! Tenho interesse na Vexis Company.%0A%0A*Dados do formulário:*%0A*Nome:* ${formData.nome}%0A*E-mail:* ${formData.email}%0A*WhatsApp:* ${formData.whatsapp}%0A*Empresa:* ${formData.empresa}%0A*Já investiu em tráfego pago?:* ${formData.experiencia}`;
    window.location.href = `https://wa.me/5591988626328?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-gold selection:text-black overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-transparent py-4 text-white">
        <div className="container mx-auto px-6 flex justify-center md:justify-between items-center">
          <a href="#" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity text-center opacity-70 md:opacity-100">
            <img src="https://i.imgur.com/yFYxnAk.png" alt="Vexis Logo" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
            <span className="font-display font-black text-2xl md:text-4xl tracking-tighter text-white uppercase">VEXIS</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#comofunciona" className="hover:text-gold transition-colors">Como funciona</a>
            <a href="#metodologia" className="hover:text-gold transition-colors">Metodologia</a>
            <button 
              onClick={handleWhatsApp}
              className="bg-gold text-black px-6 py-2 rounded-full font-bold transition-transform flex items-center gap-2"
            >
              Falar no WhatsApp
              <MessageCircle size={18} />
            </button>
          </div>
        </div>
      </nav>

      <main>
        
        {/* HERO */}
        <section id="hero" className="relative min-h-[90vh] flex items-center py-24 md:py-20 overflow-hidden bg-black">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-20 pt-16 md:pt-0 text-white">
            <div className="text-left">
              <h1 className="font-display font-black tracking-tighter text-3xl md:text-5xl lg:text-3xl leading-[1.1] mb-6">
                PRECISANDO <span className="text-gold">VENDER</span> <br className="hidden md:block" /> MAIS IMÓVEIS?
              </h1>
              <p className="text-base md:text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
                Aumentamos a carteira de clientes da sua corretora com estratégia, autoridade digital e execução — sem depender só de indicação.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleWhatsApp}
                  className="bg-gold text-black font-display font-bold text-base md:text-lg px-6 py-3 rounded-lg hover:brightness-110 transition-all uppercase flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  QUERO MAIS CLIENTES
                  <ChevronRight size={20} />
                </button>
                <a 
                  href="#comofunciona"
                  className="border-2 border-white/10 text-white font-display font-bold text-base md:text-lg px-6 py-3 rounded-lg hover:bg-white/5 transition-all uppercase text-center w-full sm:w-auto"
                >
                  COMO FUNCIONA
                </a>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 h-full w-full md:w-1/2 overflow-hidden flex z-10">
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10 hidden md:block"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
             <img 
               src="https://i.imgur.com/yWL1D6ih.jpg" 
               alt="Vexis Hero" 
               className="w-full h-full object-cover opacity-60 md:opacity-100 object-top md:object-center"
               referrerPolicy="no-referrer"
             />
          </div>
        </section>

        {/* O QUE VOCÊ RECEBE */}
        <section className="py-24 bg-black/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display font-black tracking-tighter text-3xl md:text-5xl lg:text-3xl mb-4 text-gold uppercase">O QUE VOCÊ RECEBE NA NOSSA CONSULTORIA GRATUITA?</h2>
              <div className="w-24 h-1 bg-gold mx-auto opacity-50"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: "01", title: "ENTENDENDO SUA ATUAL SITUAÇÃO", text: "Começamos com uma análise completa da sua situação atual e, juntos, identificamos os desafios e gargalos que estão limitando seu crescimento." },
                { num: "02", title: "O QUE SUA EMPRESA REALMENTE PRECISA", text: "Depois de entendermos onde sua empresa está, iremos te mostrar exatamente o que precisa ser feito e qual é o próximo passo que a sua empresa precisa dar." },
                { num: "03", title: "PLANO DE AÇÃO ESTRATÉGICO", text: "Além de te dar o próximo passo, vamos criar um plano de ação estratégico para você aumentar sua demanda qualificada e o número de vendas. Receba um plano de ação claro e estratégico, criado especialmente para que sua empresa possa escalar cada vez mais." }
              ].map((card, i) => (
                <div 
                  key={i}
                  className="bg-dark-card p-6 md:p-10 rounded-2xl border border-white/5 hover:border-gold/30 transition-all group"
                >
                  <span className="font-display font-black text-xl text-gold mb-6 block opacity-50 group-hover:opacity-100 transition-opacity">
                    PASSO {card.num}
                  </span>
                  <h3 className="font-display font-bold text-2xl mb-4 group-hover:text-gold transition-colors">{card.title}</h3>
                  <p className="text-white/60 leading-relaxed text-xs md:text-lg">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="comofunciona" className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-gold tracking-[0.3em] font-bold text-sm mb-2 block uppercase">VAMOS ACELERAR</span>
                <h2 className="font-display font-black tracking-tight text-3xl md:text-5xl mb-8 leading-tight">
                  DAR O PRÓXIMO PASSO LEVA APENAS UM MINUTO
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <span className="font-display font-black text-4xl text-gold">01</span>
                    <div>
                      <h4 className="text-2xl font-bold mb-2">Preencha o formulário.</h4>
                      <p className="text-white/60 leading-relaxed">Envie suas informações de contato. Todos os seus dados estarão seguros. Vamos cuidar bem deles.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <span className="font-display font-black text-4xl text-gold">02</span>
                    <div>
                      <h4 className="text-2xl font-bold mb-2">Receba uma ligação de nossos especialistas.</h4>
                      <p className="text-white/60 leading-relaxed">Em até 12 horas, um dos nossos especialistas fará uma ligação para agendar a reunião mais importante para a sua corretora. E juntos, iremos criar um plano completo para ter leads qualificados todos os dias.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FORMULÁRIO */}
              <div className="bg-dark-card p-6 md:p-10 rounded-3xl border border-gold/20 shadow-2xl shadow-gold/5 max-w-lg md:ml-auto w-full backdrop-blur-sm bg-black/40">
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-white/50">Nome Completo</label>
                    <input 
                      type="text" required 
                      className="w-full bg-black/60 border border-white/10 p-4 rounded-lg focus:border-gold outline-none transition-all text-sm"
                      placeholder="Ex: João Silva"
                      value={formData.nome || ''}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-white/50">E-mail corporativo</label>
                    <input 
                      type="email" required 
                      className="w-full bg-black/60 border border-white/10 p-4 rounded-lg focus:border-gold outline-none transition-all text-sm"
                      placeholder="seuemail@empresa.com"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-white/50">Telefone da pessoa (com DDD)</label>
                    <input 
                      type="tel" required 
                      className="w-full bg-black/60 border border-white/10 p-4 rounded-lg focus:border-gold outline-none transition-all text-sm"
                      placeholder="(00) 00000-0000"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-white/50">Nome da empresa</label>
                    <input 
                      type="text" required 
                      className="w-full bg-black/60 border border-white/10 p-4 rounded-lg focus:border-gold outline-none transition-all text-sm"
                      placeholder="Ex: Imobiliária Vexis"
                      value={formData.empresa}
                      onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-4 uppercase tracking-wider text-white/50">Já investiu em tráfego pago?</label>
                    <div className="space-y-3">
                      {[
                        "Já contratei uma agência no passado",
                        "Nunca fiz anúncios",
                        "Já fiz anúncios por conta própria",
                        "Estou com uma agência, porém insatisfeito"
                      ].map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" name="exp" 
                            className="w-5 h-5 accent-gold border-white/20 bg-black cursor-pointer"
                            checked={formData.experiencia === item}
                            onChange={() => setFormData({...formData, experiencia: item})}
                          />
                          <span className="group-hover:text-gold transition-colors text-xs md:text-sm uppercase font-medium">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-gold text-black font-display font-bold text-xl py-5 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-gold/20 uppercase mt-4"
                  >
                    MAIS INFORMAÇÕES
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* METODOLOGIA - MÉTODO CAAG */}
        <section id="metodologia" className="py-24 bg-black/40 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <span className="text-gold tracking-[0.3em] font-bold text-sm mb-4 block">EXCLUSIVIDADE VEXIS</span>
              <h2 className="font-display font-black tracking-tighter text-3xl md:text-5xl lg:text-3xl mb-4 uppercase">MÉTODO <span className="text-gold">CAAG</span></h2>
              <p className="text-white/50 max-w-2xl mx-auto italic">O sistema testado para converter cliques em escrituras assinadas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
              {/* Connector Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent hidden md:block"></div>
              
              {METODOLOGIA_STEPS.map((step, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="bg-dark-card w-20 h-20 rounded-full flex items-center justify-center border-2 border-gold mb-6 relative z-10 group-hover:scale-110 transition-transform shadow-lg shadow-gold/10">
                    {step.icon}
                  </div>
                  <h4 className="font-display font-bold text-sm text-gold tracking-widest mb-2 uppercase">PASSO 0{i+1}</h4>
                  <h3 className="font-display font-bold text-3xl mb-4 uppercase">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VOCÊ SE IDENTIFICA? */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="p-10 md:p-16">
              <h2 className="font-display font-black tracking-tight text-2xl md:text-3xl lg:text-2xl text-center mb-12 uppercase">VOCÊ SE <span className="text-gold">IDENTIFICA</span> COM ISSO?</h2>
              
              <div className="space-y-6 mb-12">
                {CHECKLIST_ITEMS.map((item, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-4 text-lg md:text-xl border-b border-white/5 pb-4"
                  >
                    <CheckCircle2 className="text-gold shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-white/50 mb-8 font-medium">Se você marcou pelo menos 2 desses itens, sua corretora está deixando dinheiro na mesa.</p>
                <button 
                  onClick={handleWhatsApp}
                  className="w-full md:w-auto bg-gold text-black font-display font-bold text-base md:text-lg px-8 py-4 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-gold/20 uppercase"
                >
                  EU QUERO MUDAR ISSO AGORA
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* QUEM SOMOS */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div
              className="order-2 md:order-1"
            >
              <h2 className="font-display font-black tracking-tight text-3xl md:text-5xl lg:text-3xl mb-8 uppercase">POR QUE A <span className="text-gold">VEXIS</span>?</h2>
              <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                <p>
                  Não somos apenas uma "agência de tráfego". Somos parceiros estratégicos do seu crescimento. Entendemos que o mercado imobiliário não aceita amadores.
                </p>
                <p>
                  Nosso foco é colocar o seu produto na frente de quem realmente tem poder de compra, construindo uma marca que seja referência na sua região. 
                </p>
                <p className="text-white font-bold italic">
                  "Menos cliques inúteis, mais reuniões produtivas."
                </p>
              </div>
              <button 
                onClick={handleWhatsApp}
                className="mt-10 border-2 border-gold text-gold font-display font-bold text-lg px-8 py-3 rounded-md hover:bg-gold hover:text-black transition-all uppercase"
              >
                CONHECER O TIME VEXIS
              </button>
            </div>
            
            <div className="relative order-1 md:order-2">
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-gold z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-gold z-0"></div>
              <img 
                src="https://i.imgur.com/yWL1D6ih.jpg" 
                alt="Agência Vexis" 
                className="w-full h-full object-cover rounded-md relative z-10 shadow-2xl shadow-gold/20"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-10 text-white/30 text-sm gap-4">
            <p>© Vexis Company 2026. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-gold transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-gold transition-colors">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
}

