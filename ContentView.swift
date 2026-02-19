import SwiftUI
import UserNotifications

struct ContentView: View {
    @StateObject var vm = WorkoutViewModel()
    @State private var selectedDay: Int = {
        let calendar = Calendar.current
        let weekday = calendar.component(.weekday, from: Date())
        // Swift weekday starts from Sunday (1), our array starts from Pazartesi
        // Monday(2)->0, Tuesday(3)->1 ... Sunday(1)->6
        return (weekday + 5) % 7
    }()
    
    var body: some View {
        NavigationView {
            ZStack {
                // Background Gradient
                LinearGradient(colors: [Color(white: 0.05), .black], startPoint: .top, endPoint: .bottom)
                    .ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // Premium Header with Notification Button
                    HStack {
                        VStack(alignment: .leading) {
                            Text(Date().formatted(.dateTime.day().month().weekday()).uppercased())
                                .font(.caption2)
                                .fontWeight(.black)
                                .foregroundColor(.orange)
                                .tracking(2)
                            Text("FITNESS")
                                .font(.system(size: 34, weight: .black, design: .rounded))
                                .foregroundColor(.white)
                        }
                        Spacer()
                        Button(action: requestNotif) {
                            Image(systemName: "bell.badge.fill")
                                .font(.title2)
                                .padding(12)
                                .background(Circle().fill(Color.orange.opacity(0.1)))
                                .foregroundColor(.orange)
                        }
                    }
                    .padding()

                    // Day Selector
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 12) {
                            ForEach(0..<vm.workouts.count, id: \.self) { index in
                                DayTab(day: vm.workouts[index].day, isSelected: selectedDay == index) {
                                    withAnimation(.spring()) {
                                        selectedDay = index
                                    }
                                }
                            }
                        }
                        .padding(.horizontal)
                    }
                    
                    // Workout Title Display
                    VStack(alignment: .leading, spacing: 4) {
                        Text(vm.workouts[selectedDay].title)
                            .font(.system(size: 24, weight: .bold, design: .rounded))
                            .foregroundColor(.white)
                        
                        Text("\(vm.workouts[selectedDay].exercises.count) Egzersiz • 17:00 Hatırlatıcı")
                            .font(.system(size: 14, weight: .medium))
                            .foregroundColor(.orange)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    
                    // Exercises List
                    if vm.workouts[selectedDay].exercises.isEmpty {
                        RestDayView()
                    } else {
                        ScrollView {
                            LazyVStack(spacing: 16) {
                                ForEach($vm.workouts[selectedDay].exercises) { $exercise in
                                    ExerciseCard(exercise: $exercise)
                                }
                            }
                            .padding(.horizontal)
                            .padding(.bottom, 30)
                        }
                    }
                }
            }
            .navigationBarHidden(true)
        }
        .preferredColorScheme(.dark)
    }

    func requestNotif() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { success, error in
            if success {
                scheduleDailyNotif()
            }
        }
    }

    func scheduleDailyNotif() {
        let content = UNMutableNotificationContent()
        content.title = "Antrenman Zamanı! 🔥"
        content.body = "Bugünkü programın seni bekliyor. Hadi basıyoruz!"
        content.sound = .default

        var dateComponents = DateComponents()
        dateComponents.hour = 17
        dateComponents.minute = 0 // Her gün 17:00

        let trigger = UNCalendarNotificationTrigger(dateMatching: dateComponents, repeats: true)
        let request = UNNotificationRequest(identifier: "workout_daily", content: content, trigger: trigger)
        UNUserNotificationCenter.current().add(request)
    }
}

struct DayTab: View {
    let day: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(day)
                .font(.system(size: 14, weight: .bold))
                .padding(.horizontal, 16)
                .padding(.vertical, 10)
                .background(isSelected ? Color.orange : Color.white.opacity(0.1))
                .foregroundColor(isSelected ? .black : .white)
                .cornerRadius(12)
        }
    }
}

struct ExerciseCard: View {
    @Binding var exercise: Exercise
    
    var body: some View {
        HStack(spacing: 15) {
            VStack(alignment: .leading, spacing: 4) {
                Text(exercise.name)
                    .font(.headline)
                    .foregroundColor(.white)
                
                Text(exercise.sets)
                    .font(.subheadline)
                    .foregroundColor(.orange.opacity(0.8))
                
                Text(exercise.detail)
                    .font(.caption)
                    .foregroundColor(.gray)
                    .lineLimit(1)
            }
            
            Spacer()
            
            Button {
                withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                    exercise.isCompleted.toggle()
                }
            } label: {
                Image(systemName: exercise.isCompleted ? "checkmark.circle.fill" : "circle")
                    .font(.system(size: 30))
                    .foregroundColor(exercise.isCompleted ? .green : .white.opacity(0.2))
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color.white.opacity(0.05))
                .overlay(
                    RoundedRectangle(cornerRadius: 20)
                        .stroke(exercise.isCompleted ? Color.green.opacity(0.3) : Color.white.opacity(0.1), lineWidth: 1)
                )
        )
    }
}

struct RestDayView: View {
    var body: some View {
        VStack(spacing: 20) {
            Spacer()
            Image(systemName: "leaf.fill")
                .font(.system(size: 60))
                .foregroundColor(.green)
            Text("Bugün Dinlenme Günü")
                .font(.title2)
                .bold()
            Text("Kasların büyüyor, zihnin dinleniyor. Keyfine bak!")
                .multilineTextAlignment(.center)
                .foregroundColor(.gray)
                .padding(.horizontal, 40)
            Spacer()
        }
    }
}
