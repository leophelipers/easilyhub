/* eslint-disable react/no-unescaped-entities */
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  CheckCircle,
  CheckSquare,
  Clock,
  Gift,
  Lightbulb,
  Pizza,
  XCircle,
} from 'lucide-react'
import Image from 'next/image'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'

export default function LandingPage() {
  const titleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const titleElement = titleRef.current
    if (titleElement) {
      const timer = setTimeout(() => {
        titleElement.style.animation = 'none'
        titleElement.style.textShadow = 'none'
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-grey-700 text-white">
      <header className="pt-8 px-4 text-center relative">
        <h1 className="text-4xl font-bold mb-4 relative inline-block">
          <span
            className="glitch-text"
            data-text="ATENÇÃO: VEJA AGORA o Método ÚNICO e SIMPLES"
            ref={titleRef}
          >
            ATENÇÃO: VEJA AGORA o Método ÚNICO e SIMPLES
          </span>
        </h1>
        <h2 className="text-2xl mb-6">
          Para Você Alcançar os Tão Sonhados{' '}
          <span style={{ color: '#FE2C55' }}>10K e a monetização</span> em 90
          DIAS ou menos
        </h2>
        <style jsx>{`
          .glitch-text {
            position: relative;
            display: inline-block;
            color: white;
            font-weight: bold;
            text-shadow:
              0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 0, 255, 0.75),
              0.025em 0.05em 0 rgba(255, 0, 0, 0.75);
            animation: glitch 500ms infinite;
          }

          .glitch-text::before,
          .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            animation-duration: 3s;
            animation-fill-mode: forwards;
          }

          .glitch-text::before {
            left: 2px;
            text-shadow: -2px 0 red;
            animation-name: glitch-2;
          }

          .glitch-text::after {
            left: -2px;
            text-shadow: -2px 0 blue;
            animation-name: glitch-3;
          }

          @keyframes glitch {
            0% {
              text-shadow:
                0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.05em -0.025em 0 rgba(0, 0, 255, 0.75),
                0.025em 0.05em 0 rgba(255, 0, 0, 0.75);
            }
            14% {
              text-shadow:
                0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.05em -0.025em 0 rgba(0, 0, 255, 0.75),
                0.025em 0.05em 0 rgba(255, 0, 0, 0.75);
            }
            15% {
              text-shadow:
                -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                0.025em 0.025em 0 rgba(0, 0, 255, 0.75),
                -0.05em -0.05em 0 rgba(255, 0, 0, 0.75);
            }
            49% {
              text-shadow:
                -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                0.025em 0.025em 0 rgba(0, 0, 255, 0.75),
                -0.05em -0.05em 0 rgba(255, 0, 0, 0.75);
            }
            50% {
              text-shadow:
                0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                0.05em 0 0 rgba(0, 0, 255, 0.75),
                0 -0.05em 0 rgba(255, 0, 0, 0.75);
            }
            99% {
              text-shadow:
                0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                0.05em 0 0 rgba(0, 0, 255, 0.75),
                0 -0.05em 0 rgba(255, 0, 0, 0.75);
            }
            100% {
              text-shadow: none;
            }
          }

          @keyframes glitch-2 {
            0% {
              clip: rect(86px, 9999px, 42px, 0);
            }
            5% {
              clip: rect(30px, 9999px, 54px, 0);
            }
            10% {
              clip: rect(1px, 9999px, 58px, 0);
            }
            15% {
              clip: rect(17px, 9999px, 31px, 0);
            }
            20% {
              clip: rect(18px, 9999px, 3px, 0);
            }
            25% {
              clip: rect(71px, 9999px, 59px, 0);
            }
            30% {
              clip: rect(53px, 9999px, 26px, 0);
            }
            35% {
              clip: rect(6px, 9999px, 34px, 0);
            }
            40% {
              clip: rect(52px, 9999px, 6px, 0);
            }
            45% {
              clip: rect(82px, 9999px, 72px, 0);
            }
            50% {
              clip: rect(46px, 9999px, 78px, 0);
            }
            55% {
              clip: rect(94px, 9999px, 96px, 0);
            }
            60% {
              clip: rect(23px, 9999px, 2px, 0);
            }
            65% {
              clip: rect(89px, 9999px, 30px, 0);
            }
            70% {
              clip: rect(12px, 9999px, 62px, 0);
            }
            75% {
              clip: rect(73px, 9999px, 56px, 0);
            }
            80% {
              clip: rect(26px, 9999px, 95px, 0);
            }
            85% {
              clip: rect(67px, 9999px, 24px, 0);
            }
            90% {
              clip: rect(24px, 9999px, 17px, 0);
            }
            95% {
              clip: rect(99px, 9999px, 92px, 0);
            }
            100% {
              clip: rect(0, 0, 0, 0);
            }
          }

          @keyframes glitch-3 {
            0% {
              clip: rect(59px, 9999px, 9px, 0);
            }
            5% {
              clip: rect(71px, 9999px, 40px, 0);
            }
            10% {
              clip: rect(54px, 9999px, 62px, 0);
            }
            15% {
              clip: rect(72px, 9999px, 95px, 0);
            }
            20% {
              clip: rect(45px, 9999px, 37px, 0);
            }
            25% {
              clip: rect(22px, 9999px, 3px, 0);
            }
            30% {
              clip: rect(90px, 9999px, 75px, 0);
            }
            35% {
              clip: rect(9px, 9999px, 69px, 0);
            }
            40% {
              clip: rect(1px, 9999px, 56px, 0);
            }
            45% {
              clip: rect(45px, 9999px, 1px, 0);
            }
            50% {
              clip: rect(31px, 9999px, 69px, 0);
            }
            55% {
              clip: rect(78px, 9999px, 3px, 0);
            }
            60% {
              clip: rect(82px, 9999px, 88px, 0);
            }
            65% {
              clip: rect(81px, 9999px, 23px, 0);
            }
            70% {
              clip: rect(10px, 9999px, 58px, 0);
            }
            75% {
              clip: rect(70px, 9999px, 65px, 0);
            }
            80% {
              clip: rect(84px, 9999px, 43px, 0);
            }
            85% {
              clip: rect(98px, 9999px, 54px, 0);
            }
            90% {
              clip: rect(79px, 9999px, 67px, 0);
            }
            95% {
              clip: rect(3px, 9999px, 19px, 0);
            }
            100% {
              clip: rect(0, 0, 0, 0);
            }
          }
        `}</style>
      </header>
      <main className="container mx-auto px-4">
        <section className="my-10 text-center space-y-3">
          <Image
            src="https://plrcristao.shop/wp-content/uploads/2024/06/Sem-Titulo-1logo-1024x576.png"
            alt="Imagem ilustrativa"
            width={600}
            height={400}
            className="mx-auto rounded-lg shadow-lg"
          />
          <Button
            size="slg"
            className="bg-green-500 hover:bg-green-600 h-12 w-min-50 text-slate-900 font-['Bebas Neue'] text-xl"
          >
            Quero aprender agora
          </Button>
        </section>

        <section className="my-12">
          <h3 className="text-3xl mb-6 font-['Bebas Neue'] text-center">
            O <span style={{ color: '#FE2C55' }}>segredo</span> dos 10 mil
            seguidores
          </h3>
          <p className="text-lg mb-4 font-hero">
            Todas as pessoas que alcançaram e conseguiram passar os 10k (10 mil)
            seguidores, passaram pelo mesmo desafio e mesmo que sem saber,
            fizeram o mesmo passo a passo.
          </p>
          <p className="text-lg mb-4 font-hero">
            O fato é que <b>BANDA COVER NÃO MUDA O MUNDO!</b> Então se você
            seguir um esquema de copia e cola NÃO IRÁ FUNCIONAR EM 99% DAS
            VEZES!
          </p>
        </section>

        <section className="my-12">
          <h3 className="text-3xl mb-6 font-['Bebas Neue'] text-center">
            O que você pode fazer com 10 mil seguidores:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              '🤑 GERAR UMA NOVA FONTE DE RENDA',
              '📢 ESPALHAR SUAS IDEIAS',
              '🤳 SER UM INFLUENCER',
              '⚡ ESCOLHER ONDE E QUANDO TRABALHAR',
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-transparent border-none shadow-md shadow-slate-900"
              >
                <CardContent className="p-6">
                  <p className="text-xl text-white">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-12 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Agora preciso te confessar uma coisa…
            </h2>

            <div className="p-6 rounded-lg shadow-md mb-8">
              <p className="text-lg mb-4">
                Eu vou te entregar{' '}
                <span className="font-bold text-blue-600">
                  TODO ESSE CONTEÚDO
                </span>{' '}
                de mãos beijadas aqui no treinamento.
              </p>
              <p className="text-lg mb-4">
                Mas o fato, é que{' '}
                <span className="font-bold text-red-600">
                  MENOS DE 20% DAS PESSOAS
                </span>{' '}
                que estão lendo isso vão realmente tomar a decisão de ter acesso
                a ele.
              </p>
            </div>

            <div className="bg-red-100 p-6 rounded-lg shadow-md mb-8 text-black">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <XCircle className="mr-2 text-red-600" />O que as pessoas fazem
                de errado:
              </h3>
              <p className="text-lg mb-4">
                E vão acabar recorrendo a{' '}
                <span className="font-bold underline">COISAS INÚTEIS</span>,
                como:
              </p>
              <ul className="list-disc list-inside mb-4 text-lg">
                <li>Comprar seguidores</li>
                <li>Programas para conseguir seguidores</li>
                <li>Automações</li>
              </ul>
              <p className="text-lg font-bold">
                Mas fazendo isso, você está{' '}
                <span className="text-red-600">ARRUINANDO</span> sua rede, pois
                você terá apenas{' '}
                <span className="text-red-600">NÚMEROS IRREAIS</span>.
              </p>
            </div>

            <div className="bg-green-100 p-6 rounded-lg shadow-md text-black">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <CheckCircle className="mr-2 text-green-600" />A solução certa:
              </h3>
              <p className="text-lg mb-4">
                Por isso, recomendo que você{' '}
                <span className="font-bold text-green-600">
                  adquira o treinamento
                </span>{' '}
                e{' '}
                <span className="font-bold text-green-600">
                  SIGA O PASSO A PASSO
                </span>{' '}
                que irei te passar, pois assim você já{' '}
                <span className="font-bold underline">
                  SAIRÁ NA FRENTE DOS 80%
                </span>{' '}
                que irão preferir usar os "métodos alternativos".
              </p>
            </div>

            <div className="mt-8 text-center">
              <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300">
                Quero Ter Acesso ao Treinamento Agora!
              </button>
            </div>
          </div>
        </section>

        <section className="text-white py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              O que você recebe no programa de 0 a 10k?
            </h2>

            <div className="space-y-12">
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <CheckSquare className="mr-3 text-green-400" size={28} />
                  Checklist Completo e Cronograma Detalhado
                </h3>
                <p className="text-lg text-gray-300">
                  Um guia passo a passo para você seguir durante os 90 dias.
                  Desde o momento zero, você saberá exatamente o que fazer, como
                  fazer e quando fazer para alcançar seus resultados.
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Gift className="mr-3 text-purple-400" size={28} />
                  Bônus Exclusivos
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckSquare
                      className="mr-2 text-green-400 flex-shrink-0 mt-1"
                      size={20}
                    />
                    <span className="text-lg text-gray-300">
                      <strong className="text-white">
                        Pack de Efeitos Visuais e Sonoros:
                      </strong>{' '}
                      Eleve a qualidade dos seus conteúdos com recursos
                      profissionais que capturam a atenção do seu público.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquare
                      className="mr-2 text-green-400 flex-shrink-0 mt-1"
                      size={20}
                    />
                    <span className="text-lg text-gray-300">
                      <strong className="text-white">
                        E-book "Princípio da Estratégia":
                      </strong>{' '}
                      Domine as técnicas que impulsionam negócios digitais e
                      crie uma base sólida para o sucesso.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Lightbulb className="mr-3 text-yellow-400" size={28} />
                  Tudo o que você precisa para o sucesso
                </h3>
                <p className="text-lg text-gray-300">
                  Tudo o que você precisa para sair do zero e transformar sua
                  ideia em um negócio lucrativo está aqui.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-transparent to-black/30 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/particles.svg')] opacity-20 animate-pulse"></div>
          <motion.div
            className="max-w-4xl mx-auto relative z-10"
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              variants={itemVariants}
            >
              Quem sabe faz ao vivo
            </motion.h2>
            <motion.div className="space-y-6" variants={itemVariants}>
              <p className="text-lg md:text-xl leading-relaxed">
                Se você está vendo isso significa que ainda pode receber um
                bônus a mais. O que carinhosamente chamamos de{' '}
                <span className="font-semibold text-yellow-400">
                  "quem sabe faz ao vivo"
                </span>
                .
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                A partir do dia{' '}
                <span className="font-semibold text-green-400">01/02/2025</span>{' '}
                iremos aplicar todas as atividades do checklist no perfil
                @easilyhub.com e compartilhar como e porque tomamos cada decisão
                ao longo do caminho.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <p className="text-lg md:text-xl font-semibold mb-4">
                  Você pode esperar para ter o checklist depois de aplicado
                  aqui? Claro que pode, porém há 2 problemas:
                </p>
                <ul className="space-y-4">
                  <motion.li
                    className="flex items-start space-x-2"
                    variants={itemVariants}
                  >
                    <span className="text-red-400 text-2xl">•</span>
                    <span className="text-lg">
                      Terão outras pessoas bem a sua frente neste processo,
                      deixando a concorrência mais qualificada.
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start space-x-2"
                    variants={itemVariants}
                  >
                    <span className="text-red-400 text-2xl">•</span>
                    <span className="text-lg">
                      Quanto mais alunos e mais o tempo passa maior ficará o
                      investimento (que hoje é mais barato do que um lanche de
                      fastfood).
                    </span>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
            <motion.div className="mt-12 text-center" variants={itemVariants}>
              <p className="text-2xl font-bold mb-4 flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                <span className="text-gray-400 line-through">
                  Preço futuro: R$ <CountUp end={497} duration={2.5} />
                </span>
                <span className="text-3xl text-green-400 mt-2 sm:mt-0">
                  Preço atual: R${' '}
                  <CountUp end={20} duration={2} decimals={2} decimal="," />
                </span>
              </p>
              <Button className="bg-gradient-to-r from-green-500 to-green-700 text-white text-lg py-6 px-8 rounded-full hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Aproveite a oportunidade agora
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <section className=" text-white py-16 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-1 rounded-lg shadow-lg">
              <div className="bg-black p-6 rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-yellow-400 flex items-center justify-center">
                  <Clock className="mr-2" />
                  OFERTA POR TEMPO LIMITADO
                </h2>

                <p className="text-xl md:text-2xl text-center mb-8">
                  Mais barato que a pizza de sábado a noite!
                </p>

                <div className="flex items-center justify-center mb-8">
                  <Pizza className="text-yellow-400 mr-4" size={48} />
                  <div className="text-center">
                    <p className="text-lg text-gray-400 line-through">
                      R$97,00
                    </p>
                    <p className="text-5xl md:text-6xl font-bold text-green-400">
                      Apenas R$20,00
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <button className="bg-green-500 text-black font-bold py-4 px-8 rounded-full text-xl hover:bg-green-400 transition duration-300 transform hover:scale-105">
                    Aproveitar Esta Oferta Agora!
                  </button>
                </div>

                <p className="text-center text-gray-400 mt-6">
                  *Oferta válida por tempo limitado. Não perca esta
                  oportunidade!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="my-12">
          <h3 className="text-3xl font-bold mb-6">GARANTIA DE 7 DIAS</h3>
          <p className="text-lg mb-4">
            Acreditamos tanto na qualidade desta MasterClass, que se dentro de
            um período de 7 DIAS, se você assistir e não gostar do que foi
            apresentado, independente de qual seja o motivo devolvemos 100% DO
            SEU DINHEIRO sem questionamentos!
          </p>
        </section>

        <section className="my-12">
          <h3 className="text-3xl font-bold mb-6">DÚVIDAS FREQUENTES</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                O que é a MasterClass do 0 aos 10k?
              </AccordionTrigger>
              <AccordionContent>
                Um treinamento em vídeo aulas que vai te ensinar a sair do 0 até
                seus 10 mil seguidores em 90 dias, ou menos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>É compra de seguidores?</AccordionTrigger>
              <AccordionContent>
                Não, você está se inscrevendo em um programa onde vai receber o
                passo a passo para crescer no tiktok. Não recomendamos que
                compre seguidores.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Como recebo o acesso?</AccordionTrigger>
              <AccordionContent>
                Após o pagamento você receberá um e-mail da TICTO com seus dados
                de acesso. Se a compra foi feita no cartão em até 5 minutos você
                receberá o acesso. No Boleto entre 1 e 3 dias úteis.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      <footer className="py-6 px-4 text-center text-sm">
        <p>
          Aviso Legal: Os resultados podem variar de pessoa para pessoa, de
          perfil para perfil e de nicho para nicho.
        </p>
        <p>
          Essa página não tem nenhuma ligação com o Facebook INC. O Facebook é
          pertencente somente ao Facebook INC.
        </p>
      </footer>
    </div>
  )
}
